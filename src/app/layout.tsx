"use client";

import { useEffect, useState } from 'react';
import './globals.css';

// Metadata removed because this is a client component

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <html lang="en" data-theme={theme}>
      <body>
        <div className="main-wrapper">
          <nav className="navbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <a href="/" className="nav-logo">CODEFIX</a>
              <img
                src="/dypatil-logo.png"
                alt="DY Patil Logo"
                style={{ height: '50px', objectFit: 'contain' }}
              />
            </div>
            <div className="nav-links">
              <a href="/" className="nav-btn">Home</a>
              <a href="/library" className="nav-btn">Library</a>
              <a href="/learning" className="nav-btn">Learning</a>
              <button onClick={toggleTheme} className="nav-btn" style={{ cursor: 'pointer' }}>
                {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </button>
            </div>
          </nav>
          <div className="emoji-float emoji-1">🐍</div>
          <div className="emoji-float emoji-2">✨</div>
          <div className="emoji-float emoji-3">💻</div>
          <div className="emoji-float emoji-4">🐛</div>

          {children}
        </div>

        <div className="dev-credit-panel">
          <div className="credit-title">MADE BY</div>
          <div className="credit-name">SATWIK GOSWAMI</div>
          <div className="credit-name">NARESH GUJRATI</div>
          <div className="credit-name">VEDANT GAWADE</div>
          <div className="credit-name">SUJAY MHATRE</div>

          <div className="credit-spacer"></div>

          <div className="credit-title">GUIDED BY</div>
          <div className="credit-name">DR. UTTAM WAGHMODE</div>
        </div>
      </body>
    </html>
  );
}
