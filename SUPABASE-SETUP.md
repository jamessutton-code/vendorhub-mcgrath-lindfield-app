# Supabase Setup

## Goal
Connect the Vendor Hub app to a real Supabase backend so campaign pages, admin data, uploads, and generated content can become database-backed.

## Immediate steps
1. Create a Supabase project
2. Add credentials to `.env.local`
3. Run `supabase-schema.sql`
4. Create the first `campaigns` record
5. Test campaign lookup by slug

## Required env vars
Copy from `.env.example` into `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## First table to validate
Start with `campaigns` only.
Once the app can:
- read a campaign by slug
- return not found cleanly
- display a password gate for a real campaign
then the core public route is structurally correct.

## First seed record recommendation
Use:
- slug: `7-wyvern-avenue-roseville`
- address: `7 Wyvern Avenue`
- suburb: `Roseville`
- display_price: `$2.7m-$3.0m`
- campaign_heat_score: `6`
- contracts_out: `TBC`
- status: `draft`
- campaign_password_hash: temporary placeholder until live password hashing is wired

## Next backend priorities after campaign read
1. real password validation flow
2. admin campaign create persistence
3. uploads storage integration
4. vendor report extraction pipeline
