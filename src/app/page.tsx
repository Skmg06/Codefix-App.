"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { QRCodeCanvas } from 'qrcode.react';

interface CodeFixError {
  errorQuery: string;
  whyItHappens: string;
  howToAvoid: string;
  solutionSteps: string;
  command: string | null;
  youtubeCode: string | null;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<CodeFixError | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorNotFound, setErrorNotFound] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q && q !== query) {
      setQuery(q);
      handleSearch(null, q);
    }
  }, [searchParams]);

  const handleSearch = async (e: React.FormEvent | null, searchQuery?: string) => {
    if (e) e.preventDefault();
    const queryToUse = searchQuery || query;
    if (!queryToUse.trim()) return;

    setQuery(queryToUse);
    // Update URL without refreshing page
    router.replace(`/?q=${encodeURIComponent(queryToUse)}`);

    setLoading(true);
    setErrorNotFound(false);
    setResult(null);

    try {
      const res = await fetch(`/api/errors?q=${encodeURIComponent(queryToUse)}`);
      const data = await res.json();

      if (data.notFound || data.error) {
        setErrorNotFound(true);
      } else {
        setResult(data as CodeFixError);
      }
    } catch (err) {
      console.error(err);
      setErrorNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1 className="logo-text">CODEFIX</h1>
        <p className="subtitle">Squash those pesky Python bugs! 🐛🔨</p>
      </header>

      <div className="search-container">
        <form onSubmit={(e) => handleSearch(e)} style={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: "700px", position: "relative" }}>
            <input
              type="text"
              className="search-input"
              placeholder="Paste your nasty terminal error here... (e.g. SyntaxError)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="search-btn" style={{ right: '10px' }}>Fix It!</button>
          </div>
        </form>
      </div>

      {!result && !errorNotFound && !loading && (
        <div className="welcome-card text-center" style={{ marginTop: '3rem', padding: '2rem' }}>
          <img
            src="/python_welcome.png"
            alt="Python Welcome"
            style={{ width: '150px', margin: '0 auto 1.5rem', display: 'block' }}
          />
          <h2 className="card-title" style={{ justifyContent: "center", fontSize: '1.8rem' }}>Welcome New Learners.......</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-color)', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
            Paste your nasty Python terminal errors into the search bar above to instantly get human-readable explanations, step-by-step solutions, and even video tutorials!
          </p>
        </div>
      )}

      {loading && <div className="loader"></div>}

      {errorNotFound && !loading && (
        <div className="solution-card text-center">
          <h2 className="card-title" style={{ justifyContent: "center" }}>🤔 Hmm... That's a new one!</h2>
          <p>We couldn't find an exact match for <b>"{query}"</b>.</p>
          <p className="mt-4">Try searching for the core error (like "SyntaxError" or "NameError") or ask your lab teacher!</p>
        </div>
      )}

      {result && !loading && (
        <div className="solution-card" style={{ position: 'relative' }}>


          <h2 className="card-title">🚨 {result.errorQuery}</h2>

          <div className="section mt-4">
            <div className="section-label">Why it happens</div>
            <p>{result.whyItHappens}</p>
          </div>

          <div className="section avoid">
            <div className="section-label">How to avoid it</div>
            <p>{result.howToAvoid}</p>
          </div>

          <div className="section solution">
            <div className="section-label">Solution (Step by Step)</div>
            {result.solutionSteps.split('\n').map((step, i) => (
              <p key={i} className="mb-4">{step}</p>
            ))}
            {result.command && (
              <div className="code-block">
                {result.command}
              </div>
            )}
          </div>

          {result.youtubeCode && (
            <>
              <h3 className="card-title mt-4">📺 Video Tutorial:</h3>
              <div className="video-container mb-4">
                <iframe
                  src={`https://www.youtube.com/embed/${result.youtubeCode}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </>
          )}

          <div className="qr-container mt-4 pt-4" style={{ borderTop: '1px solid var(--accent-base)' }}>
            <h3 className="card-title" style={{ fontSize: '1.5rem', justifyContent: 'center', marginBottom: '1rem' }}>🌍 Get Solution in Local Languages</h3>
            <div className="qr-wrapper">
              <div className="qr-box">
                <QRCodeCanvas
                  value={`https://translate.google.com/?sl=en&tl=hi&text=${encodeURIComponent(result.whyItHappens + '\n\n' + result.howToAvoid + '\n\n' + result.solutionSteps)}&op=translate`}
                  size={140}
                  level="M"
                  includeMargin={true}
                />
                <div className="qr-label">Scan for Hindi 🇮🇳</div>
              </div>

              <div className="qr-box">
                <QRCodeCanvas
                  value={`https://translate.google.com/?sl=en&tl=mr&text=${encodeURIComponent(result.whyItHappens + '\n\n' + result.howToAvoid + '\n\n' + result.solutionSteps)}&op=translate`}
                  size={140}
                  level="M"
                  includeMargin={true}
                />
                <div className="qr-label">Scan for Marathi 🚩</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
