import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ width: 'min(900px, calc(100% - 32px))', margin: '0 auto', padding: '40px 0 60px' }}>
      <h1>Vendor Hub App</h1>
      <p>Foundation scaffold for the McGrath Lindfield multi-campaign vendor portal.</p>
      <ul>
        <li><Link href="/admin">Admin</Link></li>
        <li><Link href="/7-wyvern-avenue-roseville">Sample campaign route</Link></li>
      </ul>
    </main>
  );
}
