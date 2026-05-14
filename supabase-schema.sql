-- Vendor Hub initial schema

create extension if not exists pgcrypto;

create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  address text not null,
  suburb text not null,
  vendor_surname text,
  campaign_password_hash text not null,
  status text not null default 'draft',
  property_type text,
  bedrooms numeric,
  bathrooms numeric,
  car_spaces numeric,
  land_size text,
  display_price text,
  go_live_date date,
  campaign_method text,
  mcgrath_listing_url text,
  campaign_heat_score numeric,
  contracts_out text,
  advertising_copy text,
  notes_internal text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists campaign_agents (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  role text not null check (role in ('lead', 'second', 'support')),
  name text not null,
  profile_url text,
  mobile text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists campaign_images (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  kind text not null check (kind in ('hero1', 'hero2', 'hero3')),
  storage_path text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists article_sources (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  title text,
  source_note text,
  fetched_text text,
  generated_summary text,
  published_at timestamptz,
  status text not null default 'active' check (status in ('active', 'archived')),
  created_at timestamptz not null default now()
);

create table if not exists shared_market_updates (
  id uuid primary key default gen_random_uuid(),
  effective_date date not null,
  market_brief text,
  campaign_implication_template text,
  stock_tone text,
  buyer_mood text,
  outlook text,
  source_summary text,
  generated_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists auction_updates (
  id uuid primary key default gen_random_uuid(),
  effective_date date not null,
  sydney_clearance_rate text,
  local_clearance_rate text,
  local_suburbs_scope text,
  commentary text,
  generated_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists campaign_comp_rules (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  primary_suburb text,
  allowed_nearby_suburbs text,
  bedroom_rule text,
  bathroom_rule text,
  car_rule text,
  price_band_pct numeric,
  property_type_rule text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists campaign_comp_snapshots (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  effective_date date not null,
  on_market_summary text,
  sold_summary text,
  price_pressure_read text,
  strategic_edge_read text,
  generated_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists uploads (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  document_type text not null check (document_type in ('vendor_report', 'rea', 'domain', 'mcgrath_digital', 'other')),
  storage_path text not null,
  file_name text not null,
  uploaded_at timestamptz not null default now(),
  processed_at timestamptz,
  processing_status text not null default 'pending'
);

create table if not exists upload_text_inputs (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  document_type text not null check (document_type in ('vendor_report', 'rea', 'domain', 'mcgrath_digital', 'other')),
  title text,
  source_text text not null,
  created_at timestamptz not null default now()
);

create table if not exists vendor_report_extractions (
  id uuid primary key default gen_random_uuid(),
  upload_id uuid references uploads(id) on delete cascade,
  upload_text_input_id uuid references upload_text_inputs(id) on delete cascade,
  contracts_out text,
  warm_buyer_summary text,
  hot_buyer_summary text,
  contract_holder_summary text,
  price_feedback_summary text,
  objections_summary text,
  positive_themes_summary text,
  watchouts_summary text,
  extracted_at timestamptz not null default now()
);

create table if not exists campaign_projections (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  effective_date date not null,
  market_outlook text,
  buyer_behaviour_outlook text,
  pricing_pressure_watch text,
  scenario_planning text,
  risk_factors text,
  opportunity_factors text,
  recommended_response text,
  generated_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists market_conditions_inputs (
  id uuid primary key default gen_random_uuid(),
  effective_date date not null,
  entered_by text,
  tone_score numeric,
  notes text,
  created_at timestamptz not null default now()
);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

DROP TRIGGER IF EXISTS campaigns_set_updated_at ON campaigns;
create trigger campaigns_set_updated_at
before update on campaigns
for each row execute function set_updated_at();
