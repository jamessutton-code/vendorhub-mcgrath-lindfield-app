import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vendor Hub | McGrath Lindfield',
  description: 'McGrath Lindfield vendor portal system',
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap');

  :root {
    --bg: #f4f1ec;
    --bg-2: #ece7df;
    --card: rgba(255, 255, 255, 0.62);
    --card-strong: rgba(255, 255, 255, 0.8);
    --card-soft: rgba(255, 255, 255, 0.5);
    --border: rgba(32, 32, 32, 0.08);
    --text: #201f1c;
    --muted: #6f6a62;
    --orange: #e67200;
    --orange-deep: #bf5f00;
    --ink-dark: #171411;
    --shadow: 0 22px 48px rgba(33, 27, 20, 0.08);
    --shadow-soft: 0 14px 28px rgba(33, 27, 20, 0.06);
    --radius-xl: 28px;
    --radius-lg: 22px;
    --radius-md: 16px;
    --shell-width: min(1280px, calc(100% - 32px));
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', sans-serif;
    background:
      radial-gradient(circle at top right, rgba(230, 114, 0, 0.12), transparent 26%),
      radial-gradient(circle at bottom left, rgba(185, 133, 73, 0.08), transparent 24%),
      linear-gradient(180deg, #f8f5f0 0%, var(--bg) 38%, var(--bg-2) 100%);
    color: var(--text);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  input,
  textarea,
  select {
    border: 1px solid rgba(32, 32, 32, 0.1);
    background: rgba(255, 255, 255, 0.86);
    border-radius: 14px;
    padding: 12px 14px;
    color: var(--text);
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid rgba(230, 114, 0, 0.22);
    border-color: rgba(230, 114, 0, 0.3);
  }

  h1,
  h2,
  h3,
  h4 {
    font-family: 'Playfair Display', serif;
    letter-spacing: -0.03em;
  }

  .vh-shell {
    width: var(--shell-width);
    margin: 0 auto;
    padding: 22px 0 48px;
  }

  .vh-glass {
    background: var(--card);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    backdrop-filter: blur(18px);
  }

  .vh-card {
    border-radius: var(--radius-lg);
    background: rgba(255, 255, 255, 0.74);
    border: 1px solid rgba(32, 32, 32, 0.08);
    box-shadow: var(--shadow-soft);
  }

  .vh-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 13px 18px;
    border-radius: 999px;
    border: none;
    font-weight: 700;
    background: linear-gradient(135deg, var(--orange) 0%, var(--orange-deep) 100%);
    color: white;
    box-shadow: 0 14px 28px rgba(230, 114, 0, 0.22);
  }

  .vh-button.vh-button-secondary {
    background: rgba(255, 255, 255, 0.7);
    color: var(--ink-dark);
    box-shadow: none;
    border: 1px solid rgba(32, 32, 32, 0.08);
  }

  @media (max-width: 900px) {
    :root {
      --shell-width: min(100%, calc(100% - 20px));
    }
  }
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
        {children}
      </body>
    </html>
  );
}
