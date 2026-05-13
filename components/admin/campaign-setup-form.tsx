import { OFFICE_LINK, SALES_AGENTS, SUPPORT_AGENTS } from '@/lib/agents';
import { generateCampaignPassword } from '@/lib/passwords';
import { slugifyAddress } from '@/lib/format';
import { createCampaignAction } from '@/app/admin/actions';

export function CampaignSetupForm() {
  const suggestedPassword = generateCampaignPassword();

  return (
    <form action={createCampaignAction} style={panelStyle}>
      <div style={{ marginBottom: 18 }}>
        <div style={kickerStyle}>New Campaign Setup</div>
        <h2 style={{ margin: '0 0 8px', fontSize: 30 }}>Campaign Intake Form</h2>
        <p style={copyStyle}>
          Internal-only setup form used to create a new vendor hub from the master template. This form should not appear on live vendor pages.
        </p>
      </div>

      <div style={gridStyle}>
        <Field label="Property address">
          <input name="address" style={inputStyle} placeholder="7 Wyvern Avenue" />
          <Hint>Use the street address exactly as it should appear on the live page.</Hint>
        </Field>

        <Field label="Suburb">
          <input name="suburb" style={inputStyle} placeholder="Roseville" />
          <Hint>Keep suburb separate so slugging and comp logic are cleaner.</Hint>
        </Field>

        <Field label="Suggested slug">
          <input name="slug" style={inputStyle} defaultValue={slugifyAddress('7 Wyvern Avenue Roseville')} />
          <Hint>Slug should be lowercase with hyphens only.</Hint>
        </Field>

        <Field label="Generated campaign password">
          <input name="generatedPassword" style={inputStyle} defaultValue={suggestedPassword} readOnly />
          <Hint>Use a real-estate term plus a number. This will later become a live generate button.</Hint>
        </Field>

        <Field label="Display price">
          <input name="displayPrice" style={inputStyle} placeholder="$2.7m-$3.0m" />
          <Hint>Use the public-facing guide exactly as it should appear.</Hint>
        </Field>

        <Field label="Property type">
          <input name="propertyType" style={inputStyle} placeholder="House" />
          <Hint>Use a clean property type label for future filtering and comps.</Hint>
        </Field>

        <Field label="Bedrooms">
          <input name="bedrooms" style={inputStyle} inputMode="numeric" placeholder="3" />
          <Hint>Numeric only.</Hint>
        </Field>

        <Field label="Bathrooms">
          <input name="bathrooms" style={inputStyle} inputMode="numeric" placeholder="3" />
          <Hint>Numeric only.</Hint>
        </Field>

        <Field label="Car spaces">
          <input name="carSpaces" style={inputStyle} inputMode="numeric" placeholder="2" />
          <Hint>Numeric only.</Hint>
        </Field>

        <Field label="Land size">
          <input name="landSize" style={inputStyle} placeholder="860sqm" />
          <Hint>Short public-facing size label.</Hint>
        </Field>

        <Field label="Go-live date">
          <input name="goLiveDate" style={inputStyle} type="date" />
          <Hint>This should drive days-on-market tracking.</Hint>
        </Field>

        <Field label="Campaign method">
          <select name="campaignMethod" style={inputStyle} defaultValue="">
            <option value="" disabled>Select campaign method</option>
            <option>Auction</option>
            <option>Private Treaty</option>
            <option>Off-Market</option>
          </select>
          <Hint>Keep to the defined campaign methods for consistency.</Hint>
        </Field>

        <Field label="McGrath office link">
          <input name="officeLink" style={inputStyle} value={OFFICE_LINK} readOnly />
          <Hint>Shared office link used across all vendor hubs.</Hint>
        </Field>

        <Field label="First agent">
          <select name="firstAgent" style={inputStyle} defaultValue="">
            <option value="" disabled>Select first agent</option>
            {SALES_AGENTS.map((agent) => <option key={agent.name}>{agent.name}</option>)}
          </select>
          <Hint>First agent will appear in the hero under `Your Agents`.</Hint>
        </Field>

        <Field label="Second agent">
          <select name="secondAgent" style={inputStyle} defaultValue="">
            <option value="" disabled>Select second agent</option>
            {SALES_AGENTS.map((agent) => <option key={agent.name}>{agent.name}</option>)}
          </select>
          <Hint>Second agent sits alongside the first in the hero.</Hint>
        </Field>

        <Field label="Campaign support">
          <select name="supportAgent" style={inputStyle} defaultValue="">
            <option value="" disabled>Select support person</option>
            {SUPPORT_AGENTS.map((agent) => <option key={agent.name}>{agent.name}</option>)}
          </select>
          <Hint>Choose the office support person running the campaign behind the scenes.</Hint>
        </Field>

        <Field label="Agent mobiles / notes">
          <textarea name="agentNotes" style={textareaStyle} placeholder="James Sutton | 04xx xxx xxx&#10;Support person | office/mobile details" />
          <Hint>Use for direct contact numbers and campaign-specific contact notes.</Hint>
        </Field>

        <Field label="Advertising copy">
          <textarea name="advertisingCopy" style={textareaStyle} placeholder="Paste campaign copy, property story, and standout feature language here." />
          <Hint>Include the actual ad copy if already written, not just shorthand notes.</Hint>
        </Field>

        <Field label="Market competition rules">
          <textarea name="compRules" style={textareaStyle} placeholder="Roseville only, 3 bed only, +/-10% of display price, similar family-home product" />
          <Hint>Define suburb, bed count, price band, and any hard filters for true comps.</Hint>
        </Field>

        <Field label="Reports available">
          <textarea name="reportsAvailable" style={textareaStyle} placeholder="Vendor report PDF week 1, REA report 10 May, Domain report 10 May, McGrath Digital social report 10 May" />
          <Hint>Weekly vendor report is the main buyer-feedback document and should also feed contracts-out extraction.</Hint>
        </Field>

        <Field label="Initial projections guidance">
          <textarea name="initialProjection" style={textareaStyle} placeholder="Early enquiry is strong. Stay disciplined on guide and focus on building buyer depth before pricing moves." />
          <Hint>Frame this as professional interpretation, not certainty or promise.</Hint>
        </Field>

        <Field label="McGrath listing URL">
          <input name="mcgrathUrl" style={inputStyle} placeholder="Add later if not yet live" />
          <Hint>This can be empty at creation and added later in campaign admin.</Hint>
        </Field>
      </div>

      <div style={{ marginTop: 18, display: 'flex', gap: 12 }}>
        <button type="submit" style={{ border: 'none', borderRadius: 999, padding: '12px 18px', background: 'linear-gradient(135deg, var(--orange), var(--orange-deep))', color: 'white', fontWeight: 700 }}>
          Create draft campaign
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={fieldStyle}>
      <label style={{ display: 'block', fontWeight: 800, marginBottom: 8 }}>{label}</label>
      {children}
    </div>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <div style={{ marginTop: 8, color: 'var(--muted)', fontSize: 14, lineHeight: 1.5 }}>{children}</div>;
}

const panelStyle = {
  borderRadius: 22,
  padding: 22,
  background: 'rgba(255,255,255,0.62)',
  border: '1px solid rgba(32,32,32,0.08)',
  boxShadow: '0 22px 48px rgba(33,27,20,0.08)',
  backdropFilter: 'blur(18px)',
} as const;

const kickerStyle = {
  fontSize: 12,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: 'var(--orange)',
  fontWeight: 800,
  marginBottom: 10,
} as const;

const copyStyle = {
  margin: 0,
  color: 'var(--muted)',
  lineHeight: 1.6,
} as const;

const gridStyle = {
  display: 'grid',
  gap: 14,
} as const;

const fieldStyle = {
  padding: 16,
  borderRadius: 18,
  background: 'rgba(32,32,32,0.04)',
  border: '1px solid rgba(32,32,32,0.06)',
} as const;

const inputStyle = {
  width: '100%',
  border: '1px solid rgba(32,32,32,0.10)',
  background: 'rgba(255,255,255,0.86)',
  borderRadius: 14,
  padding: '12px 14px',
} as const;

const textareaStyle = {
  ...inputStyle,
  minHeight: 120,
  resize: 'vertical' as const,
} as const;
