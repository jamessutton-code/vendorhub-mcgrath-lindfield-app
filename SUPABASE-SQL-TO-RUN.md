# Run This In Supabase SQL Editor

Open your Supabase project:
- https://supabase.com/dashboard/project/bkenwvchcofksfdlwgnj/sql/new

Then paste the full contents of:
- `/home/ubuntu/.openclaw/workspace/vendor-hub-app/supabase-schema.sql`

## Why this is needed
The app now has real env keys, but the database still needs the Vendor Hub tables before campaign create/edit and upload flows can persist.

## After running
Once the SQL succeeds, these app paths can start working against the real DB layer:
- campaign create flow
- campaign settings update flow
- campaign lookup by slug
- upload record creation

## First campaign seed after schema
After the SQL is run, I will immediately seed:
- `7-wyvern-avenue-roseville`
- draft campaign record
- real hashed password field
- basic display price and campaign settings
