import fs from 'node:fs';
import path from 'node:path';

export function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export function readSchemaSql() {
  const schemaPath = path.join(process.cwd(), 'supabase-schema.sql');
  return fs.readFileSync(schemaPath, 'utf8');
}
