"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ErrorListItem {
    id: number;
    errorQuery: string;
}

export default function LibraryPage() {
    const [allErrors, setAllErrors] = useState<ErrorListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const router = useRouter();

    const fetchErrors = () => {
        setLoading(true);
        setErrorMsg(null);
        fetch('/api/all-errors')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Server returned status ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setAllErrors(data);
                } else if (data.error) {
                    setErrorMsg(data.message || data.error);
                }
            })
            .catch(err => {
                console.error("Could not fetch error list", err);
                setErrorMsg(err.message || "Failed to load errors");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchErrors();
    }, []);

    const handleSelectError = (errorQuery: string) => {
        router.push(`/?q=${encodeURIComponent(errorQuery)}`);
    };

    return (
        <div className="container">
            <div className="solution-card text-center" style={{ animationDelay: '0s' }}>
                <h1 className="logo-text" style={{ textShadow: "2px 2px 0px var(--accent-blue)", color: "var(--text-primary)" }}>
                    📚 Error Library
                </h1>
                <p className="subtitle" style={{ color: "var(--text-secondary)", background: "transparent", marginTop: "1rem" }}>
                    Browse all {allErrors.length} tracked Python errors and bugs.
                </p>
            </div>

            <div className="solution-card">
                <h3 style={{ marginBottom: '1rem' }}>Click any error to solve it instantly:</h3>

                {loading ? (
                    <div className="loader"></div>
                ) : errorMsg && allErrors.length === 0 ? (
                    <div className="text-center" style={{ padding: '2rem' }}>
                        <p style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>⚠️ Unable to load error library: {errorMsg}</p>
                        <button className="nav-btn" onClick={fetchErrors}>Retry</button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {allErrors.map((err) => (
                            <button
                                key={err.id}
                                className="nav-btn"
                                style={{ fontSize: '0.9rem', padding: '0.5rem 1rem', cursor: 'pointer', background: 'var(--accent-blue)', color: 'white' }}
                                onClick={() => handleSelectError(err.errorQuery)}
                            >
                                {err.errorQuery}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
