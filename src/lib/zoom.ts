// lib/zoom.ts — Zoom Server-to-Server OAuth + meeting CRUD

let _token: string | null = null;
let _tokenExpiresAt = 0;

async function getZoomToken(): Promise<string> {
  if (_token && Date.now() < _tokenExpiresAt - 60_000) return _token;

  const clientId = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;
  const accountId = process.env.ZOOM_ACCOUNT_ID;

  if (!clientId || !clientSecret || !accountId) {
    throw new Error("Missing Zoom env vars (ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET, ZOOM_ACCOUNT_ID)");
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`,
    {
      method: "POST",
      headers: { Authorization: `Basic ${credentials}` },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Zoom OAuth failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  _token = data.access_token as string;
  _tokenExpiresAt = Date.now() + data.expires_in * 1000;
  return _token;
}

interface ZoomMeetingResult {
  meetingId: string;
  joinUrl: string;
  startUrl: string;
}

export async function createZoomMeeting(opts: {
  topic: string;
  startTime: Date;
  durationMinutes: number;
}): Promise<ZoomMeetingResult> {
  const token = await getZoomToken();

  const res = await fetch("https://api.zoom.us/v2/users/me/meetings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic: opts.topic,
      type: 2, // scheduled
      start_time: opts.startTime.toISOString(),
      duration: opts.durationMinutes,
      timezone: "Europe/Madrid",
      settings: {
        join_before_host: true,
        waiting_room: false,
        auto_recording: "cloud",
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Zoom create meeting failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  return {
    meetingId: String(data.id),
    joinUrl: data.join_url,
    startUrl: data.start_url,
  };
}

export async function deleteZoomMeeting(meetingId: string): Promise<void> {
  const token = await getZoomToken();

  const res = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok && res.status !== 404) {
    const text = await res.text();
    throw new Error(`Zoom delete meeting failed (${res.status}): ${text}`);
  }
}
