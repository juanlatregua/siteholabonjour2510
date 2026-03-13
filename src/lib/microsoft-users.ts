// lib/microsoft-users.ts — Create Microsoft 365 Education users via Graph API
// Requires Application permissions: User.ReadWrite.All, Directory.ReadWrite.All
// Reuses the same Azure AD app registration as azure-mail.ts

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getGraphToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.token;
  }

  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error("Missing Azure credentials (AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET)");
  }

  const res = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Azure token error ${res.status}: ${text}`);
  }

  const data = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return cachedToken.token;
}

// ── License SKU IDs for Microsoft 365 Education ──
// These are well-known GUIDs for Education A1 licenses
// Faculty: Microsoft 365 A1 for faculty
const FACULTY_SKU_ID = "94763226-9b3c-4e75-a931-5c89701abe66";
// Student: Microsoft 365 A1 for students
const STUDENT_SKU_ID = "314c4481-f395-4525-be8b-2ec4bb1e9d91";

function generatePassword(length = 14): string {
  // Must meet complexity: uppercase, lowercase, digit, special char
  const upper = "ABCDEFGHJKMNPQRSTUVWXYZ";
  const lower = "abcdefghjkmnpqrstuvwxyz";
  const digits = "23456789";
  const special = "!@#$%&*";
  const all = upper + lower + digits + special;

  let pw = "";
  pw += upper[Math.floor(Math.random() * upper.length)];
  pw += lower[Math.floor(Math.random() * lower.length)];
  pw += digits[Math.floor(Math.random() * digits.length)];
  pw += special[Math.floor(Math.random() * special.length)];

  for (let i = 4; i < length; i++) {
    pw += all[Math.floor(Math.random() * all.length)];
  }

  // Shuffle
  return pw
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2) // first name + last name
    .join(".");
}

export interface M365UserResult {
  microsoftUserId: string;
  microsoftEmail: string; // user@holabonjour.es
  tempPassword: string;
}

/**
 * Create a Microsoft 365 Education user and assign a license.
 * @param fullName - Display name (e.g., "Marie Dupont")
 * @param licenseType - "faculty" for teachers, "student" for students
 * @returns The created user's M365 ID, email, and temp password
 */
export async function createM365User(
  fullName: string,
  licenseType: "faculty" | "student"
): Promise<M365UserResult> {
  const token = await getGraphToken();
  const domain = "holabonjour.es";
  const mailNickname = slugifyName(fullName);
  const tempPassword = generatePassword();

  // Check if user already exists
  let upn = `${mailNickname}@${domain}`;
  const existsRes = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(upn)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (existsRes.ok) {
    // User exists — add a random suffix
    const suffix = Math.floor(Math.random() * 999)
      .toString()
      .padStart(3, "0");
    upn = `${mailNickname}${suffix}@${domain}`;
  }

  // Create user
  const createRes = await fetch("https://graph.microsoft.com/v1.0/users", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accountEnabled: true,
      displayName: fullName,
      mailNickname: mailNickname,
      userPrincipalName: upn,
      usageLocation: "ES",
      passwordProfile: {
        password: tempPassword,
        forceChangePasswordNextSignIn: true,
      },
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.text();
    throw new Error(`Failed to create M365 user: ${createRes.status} ${err}`);
  }

  const user = await createRes.json();
  const userId = user.id as string;

  // Assign license (with retry — sometimes user isn't ready immediately)
  const skuId = licenseType === "faculty" ? FACULTY_SKU_ID : STUDENT_SKU_ID;

  let licenseAssigned = false;
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await new Promise((r) => setTimeout(r, 2000)); // wait 2s

    const licRes = await fetch(
      `https://graph.microsoft.com/v1.0/users/${userId}/assignLicense`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addLicenses: [{ skuId, disabledPlans: [] }],
          removeLicenses: [],
        }),
      }
    );

    if (licRes.ok) {
      licenseAssigned = true;
      break;
    }

    const licErr = await licRes.text();
    console.warn(`[m365] License assign attempt ${attempt + 1} failed: ${licErr}`);
  }

  if (!licenseAssigned) {
    console.error(`[m365] Could not assign license to ${upn}. User created but unlicensed.`);
  }

  return {
    microsoftUserId: userId,
    microsoftEmail: upn,
    tempPassword,
  };
}

/**
 * Create a Teams online meeting for a professor.
 * The professor must have an M365 account with Teams enabled.
 */
export async function createTeamsMeeting(opts: {
  organizerMsId: string;
  subject: string;
  startTime: Date;
  durationMinutes: number;
}): Promise<{ joinUrl: string; meetingId: string }> {
  const token = await getGraphToken();

  const endTime = new Date(opts.startTime.getTime() + opts.durationMinutes * 60 * 1000);

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${opts.organizerMsId}/onlineMeetings`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: opts.subject,
        startDateTime: opts.startTime.toISOString(),
        endDateTime: endTime.toISOString(),
        lobbyBypassSettings: {
          scope: "everyone",
          isDialInBypassEnabled: true,
        },
        isEntryExitAnnounced: false,
        allowedPresenters: "organizer",
        recordAutomatically: true,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to create Teams meeting: ${res.status} ${err}`);
  }

  const meeting = await res.json();
  return {
    joinUrl: meeting.joinWebUrl as string,
    meetingId: meeting.id as string,
  };
}

/**
 * List available license SKUs in the tenant (for debugging/verification).
 */
export async function listAvailableLicenses(): Promise<
  Array<{ skuId: string; skuPartNumber: string; available: number }>
> {
  const token = await getGraphToken();
  const res = await fetch("https://graph.microsoft.com/v1.0/subscribedSkus", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to list licenses: ${res.status} ${err}`);
  }

  const data = await res.json();
  return (data.value || []).map(
    (sku: { skuId: string; skuPartNumber: string; prepaidUnits: { enabled: number }; consumedUnits: number }) => ({
      skuId: sku.skuId,
      skuPartNumber: sku.skuPartNumber,
      available: sku.prepaidUnits.enabled - sku.consumedUnits,
    })
  );
}
