import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabaseAdmin: SupabaseClient | null = null;

function getSupabaseAdmin() {
  if (!_supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) throw new Error("Missing Supabase env vars");
    _supabaseAdmin = createClient(url, serviceKey);
  }
  return _supabaseAdmin;
}

const BUCKET = "materials";

export async function uploadMaterial(
  file: Buffer,
  path: string
): Promise<{ path: string }> {
  const { data, error } = await getSupabaseAdmin().storage
    .from(BUCKET)
    .upload(path, file, { upsert: true });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  return { path: data.path };
}

export async function getSignedUrl(
  path: string,
  expiresIn = 3600
): Promise<string> {
  const { data, error } = await getSupabaseAdmin().storage
    .from(BUCKET)
    .createSignedUrl(path, expiresIn);
  if (error) throw new Error(`Signed URL failed: ${error.message}`);
  return data.signedUrl;
}

export async function deleteMaterial(path: string): Promise<void> {
  const { error } = await getSupabaseAdmin().storage.from(BUCKET).remove([path]);
  if (error) throw new Error(`Delete failed: ${error.message}`);
}
