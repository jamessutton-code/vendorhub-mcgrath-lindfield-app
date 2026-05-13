# Vendor Hub App Next Steps

## Current state
The project now has:
- Next.js scaffold
- dynamic campaign route
- admin route
- campaign intake form scaffold
- shared agent/support roster
- initial Supabase schema draft

## Next implementation order

### 1. Data wiring
- create Supabase project
- run `supabase-schema.sql`
- replace mock campaign data with DB reads
- create first campaign record

### 2. Vendor access control
- build campaign password gate
- store password hashes in `campaigns`
- set session cookie after successful unlock

### 3. Admin persistence
- wire campaign setup form to create campaign records
- add campaign edit page
- add McGrath web link editor
- add campaign heat + display price editor

### 4. Upload pipeline
- campaign-level upload UI
- vendor report PDF upload
- REA / Domain / McGrath Digital upload
- storage integration
- upload records in DB

### 5. Extraction pipeline
- parse weekly vendor report text
- extract contracts out
- extract buyer feedback groups
- store structured extraction output

### 6. Daily refresh automation
- schedule ~5:00 AM AEST job
- refresh shared market updates
- refresh auction updates
- refresh competition reads
- refresh projections

### 7. Vendor-facing page expansion
- port remaining tabs from master template into app components
- connect stored generated outputs to those tabs
- add mobile/iPad QA pass

## Immediate recommendation
Do next:
1. connect Supabase
2. create DB-backed campaign read
3. build vendor password gate
4. build campaign-create persistence
