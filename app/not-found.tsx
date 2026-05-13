export default function NotFoundPage() {
  return (
    <main style={{ width: 'min(700px, calc(100% - 32px))', margin: '80px auto', padding: 24 }}>
      <h1>Campaign not found</h1>
      <p style={{ color: 'var(--muted)' }}>This vendor hub route does not currently map to a live campaign.</p>
    </main>
  );
}
