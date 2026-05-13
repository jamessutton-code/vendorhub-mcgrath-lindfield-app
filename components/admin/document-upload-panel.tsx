import { uploadCampaignDocumentAction } from '@/app/admin/campaigns/[slug]/upload-actions';
import { DOCUMENT_TYPES } from '@/lib/uploads';
import type { UploadHistoryItem } from '@/lib/upload-history';

export function DocumentUploadPanel({ slug, history }: { slug: string; history: UploadHistoryItem[] }) {
  return (
    <section style={{ borderRadius: 22, padding: 22, background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(32,32,32,0.08)', boxShadow: '0 22px 48px rgba(33,27,20,0.08)' }}>
      <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 800, marginBottom: 10 }}>
        Document Uploads
      </div>
      <h2 style={{ margin: '0 0 8px', fontSize: 24 }}>Campaign File Intake</h2>
      <p style={{ margin: '0 0 18px', color: 'var(--muted)', lineHeight: 1.6 }}>
        This panel is where the real upload flow will live for vendor reports, REA reports, Domain reports, and McGrath Digital files.
      </p>

      <form action={uploadCampaignDocumentAction} style={{ display: 'grid', gap: 14 }}>
        <input type="hidden" name="slug" value={slug} />
        <div style={fieldStyle}>
          <label style={labelStyle}>Document type</label>
          <select name="documentType" style={inputStyle} defaultValue="vendor_report">
            {DOCUMENT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Upload file</label>
          <input name="file" style={inputStyle} type="file" accept="application/pdf" />
          <div style={hintStyle}>PDF-first upload path. Weekly Vendor Report is the core combined buyer-feedback document.</div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" style={buttonStyle}>Upload PDF</button>
        </div>
      </form>

      <div style={{ marginTop: 18, display: 'grid', gap: 10 }}>
        <div style={{ fontWeight: 800 }}>Upload history</div>
        {history.length ? history.map((item) => (
          <div key={`${item.fileName}-${item.documentType}`} style={historyCardStyle}>
            <div style={{ fontWeight: 700 }}>{item.fileName}</div>
            <div style={{ color: 'var(--muted)', fontSize: 14 }}>{item.documentType} · {item.status}</div>
          </div>
        )) : <div style={hintStyle}>No uploads yet.</div>}
      </div>
    </section>
  );
}

const fieldStyle = {
  padding: 16,
  borderRadius: 18,
  background: 'rgba(32,32,32,0.04)',
  border: '1px solid rgba(32,32,32,0.06)',
} as const;

const labelStyle = {
  display: 'block',
  fontWeight: 800,
  marginBottom: 8,
} as const;

const inputStyle = {
  width: '100%',
  border: '1px solid rgba(32,32,32,0.10)',
  background: 'rgba(255,255,255,0.86)',
  borderRadius: 14,
  padding: '12px 14px',
} as const;

const hintStyle = {
  marginTop: 8,
  color: 'var(--muted)',
  fontSize: 14,
  lineHeight: 1.5,
} as const;

const buttonStyle = {
  border: 'none',
  borderRadius: 999,
  padding: '12px 18px',
  background: 'linear-gradient(135deg, var(--orange), var(--orange-deep))',
  color: 'white',
  fontWeight: 700,
} as const;

const historyCardStyle = {
  padding: 14,
  borderRadius: 16,
  background: 'rgba(32,32,32,0.04)',
  border: '1px solid rgba(32,32,32,0.06)',
} as const;
