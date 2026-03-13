"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ErrorListItem {
    id: number;
    errorQuery: string;
}

export default function LibraryPage() {
    const [allErrors, setAllErrors] = useState<ErrorListItem[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/all-errors')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setAllErrors(data);
            })
            .catch(err => console.error("Could not fetch error list", err));
    }, []);

    const handleSelectError = (errorQuery: string) => {
        // Navigate back to home and pass query via URL params or just let them use it.
        // Easiest is to save it to localStorage or pass as URL param, but we'll use URL params.
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

                {allErrors.length === 0 ? (
                    <div className="loader"></div>
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
