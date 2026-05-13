# Storage Plan

## Bucket
Create Supabase Storage bucket:
- `campaign-documents`

## Path convention
Store uploads under:
- `{campaign-slug}/{document-type}/{timestamp}-{original-file-name}`

Examples:
- `7-wyvern-avenue-roseville/vendor_report/1715424000-vendor-report-week-1.pdf`
- `7-wyvern-avenue-roseville/rea/1715424000-rea-report.pdf`
- `7-wyvern-avenue-roseville/mcgrath_digital/1715424000-social-report.pdf`

## Supported first-pass document types
- `vendor_report`
- `rea`
- `domain`
- `mcgrath_digital`
- `other`

## Workflow
1. upload PDF into bucket
2. create `uploads` row in DB
3. mark `processing_status = pending`
4. extraction job reads pending uploads later
5. extraction results get written into structured tables
