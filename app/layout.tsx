import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vendor Hub App',
  description: 'McGrath Lindfield vendor portal system',
};

const globalStyles = `
  :root {
    --bg: #f4f1ec;
    --bg-2: #ece7df;
    --card: rgba(255, 255, 255, 0.62);
    --card-strong: rgba(255, 255, 255, 0.76);
    --border: rgba(32, 32, 32, 0.08);
    --text: #201f1c;
    --muted: #6f6a62;
    --orange: #e67200;
    --orange-deep: #bf5f00;
    --shadow: 0 22px 48px rgba(33, 27, 20, 0.08);
    --shadow-soft: 0 14px 28px rgba(33, 27, 20, 0.06);
    --radius-xl: 28px;
    --radius-lg: 22px;
    --radius-md: 16px;
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
    font-family: Arial, sans-serif;
    background:
      radial-gradient(circle at top right, rgba(230, 114, 0, 0.10), transparent 28%),
      linear-gradient(180deg, #f7f3ee 0%, var(--bg) 40%, var(--bg-2) 100%);
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
