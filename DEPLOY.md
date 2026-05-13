# Deploy Notes

## Current state
The app is ready for first hosted scaffold deployment once dependencies are installed and a host project is created.

## Target deployment shape
- Host: Vercel preferred for Next.js + cron support
- Domain later: `vendorhubmcgrathlindfield.com`
- Env vars required before real data works:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

## Safe first deployment
Deploy the scaffold first even before Supabase is live.
That gives:
- working routes
- vendor password gate surface
- admin intake surface
- campaign admin surface
- deploy URL for review

## Before real vendor use
Must complete:
1. Supabase connection
2. schema run
3. real campaign creation persistence
4. password validation against stored hash
5. upload/storage flow
6. PDF extraction pipeline
7. output review and approval path
