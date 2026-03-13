"use client";

import { useState } from 'react';

const QUIZ_QUESTIONS = [
    {
        q: "What is the correct way to print 'Hello World' in Python?",
        options: ["echo 'Hello World'", "print('Hello World')", "printf('Hello World')", "console.log('Hello World')"],
        answer: 1,
        explanation: "Python uses the built-in `print()` function to output text."
    },
    {
        q: "Why might you get an `IndentationError`?",
        options: ["You forgot a semicolon", "You divided by zero", "You mixed spaces and tabs or missed spaces after a colon", "You misspelled a variable"],
        answer: 2,
        explanation: "Python enforces strict whitespace rules instead of curly braces."
    },
    {
        q: "How do you fix `TypeError: can only concatenate str (not \"int\") to str`?",
        options: ["Multiply them instead", "Convert the string to int using int()", "Convert the integer to a string using str()", "Add a space between them"],
        answer: 2,
        explanation: "You cannot add text and numbers together directly. Use `str(number)` first."
    },
    {
        q: "If a list has 3 items, what happens if you ask for `my_list[3]`?",
        options: ["It returns the 3rd item", "IndexError: list index out of range", "It returns None", "SyntaxError"],
        answer: 1,
        explanation: "Lists are 0-indexed. A list of 3 items only goes up to index 2 (0, 1, 2)."
    },
    {
        q: "What does `NameError: name is not defined` usually mean?",
        options: ["You misspelled a variable name or forgot to declare it", "Python doesn't recognize your name", "The variable is too long", "You need to import 'name'"],
        answer: 0,
        explanation: "This usually points to a typo or trying to use a variable before assigning it."
    }
];

export default function LearningPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [answeredState, setAnsweredState] = useState<{ selected: number | null, isCorrect: boolean }>({ selected: null, isCorrect: false });

    const handleAnswer = (index: number) => {
        if (answeredState.selected !== null) return; // Prevent double clicking

        const correct = index === QUIZ_QUESTIONS[currentQuestion].answer;
        if (correct) setScore(score + 1);

        setAnsweredState({ selected: index, isCorrect: correct });
    };

    const nextQuestion = () => {
        if (currentQuestion + 1 < QUIZ_QUESTIONS.length) {
            setCurrentQuestion(currentQuestion + 1);
            setAnsweredState({ selected: null, isCorrect: false });
        } else {
            setShowResult(true);
        }
    };

    return (
        <div className="container">
            <div className="solution-card text-center" style={{ animationDelay: '0s' }}>
                <h1 className="logo-text" style={{ textShadow: "2px 2px 0px var(--accent-blue)", color: "var(--text-primary)" }}>
                    📚 Learning Hub
                </h1>
                <p className="subtitle" style={{ color: "var(--text-secondary)", background: "transparent", marginTop: "1rem" }}>
                    Master Python and squash bugs before they hatch!
                </p>
            </div>

            <div className="solution-card">
                <h2 className="card-title">📺 Python Fundamentals</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    <div className="video-container" style={{ marginTop: 0 }}>
                        <iframe src="https://www.youtube.com/embed/k9TUPpGqYTo" allowFullScreen></iframe>
                    </div>
                    <div className="video-container" style={{ marginTop: 0 }}>
                        <iframe src="https://www.youtube.com/embed/Z1Yd7upQsXY" allowFullScreen></iframe>
                    </div>
                </div>
            </div>

            <div className="solution-card">
                <h2 className="card-title">🎮 Python Error Quiz</h2>

                {showResult ? (
                    <div className="text-center section solution">
                        <h2>Quiz Complete!</h2>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '1rem 0' }}>You scored {score} out of {QUIZ_QUESTIONS.length}!</p>
                        {score === QUIZ_QUESTIONS.length ? (
                            <p>Perfect! You are a Python Bug Squashing Master! 🐍✨</p>
                        ) : (
                            <p>Keep practicing! Every bug you fix makes you a better coder. 💻</p>
                        )}
                        <button className="search-btn" style={{ position: 'relative', marginTop: '1rem', right: 'auto', transform: 'none' }} onClick={() => {
                            setCurrentQuestion(0);
                            setScore(0);
                            setShowResult(false);
                            setAnsweredState({ selected: null, isCorrect: false });
                        }}>Try Again</button>
                    </div>
                ) : (
                    <div className="section">
                        <div className="section-label">Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}</div>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>{QUIZ_QUESTIONS[currentQuestion].q}</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {QUIZ_QUESTIONS[currentQuestion].options.map((option, idx) => {
                                let bg = 'var(--card-bg)';
                                let color = 'var(--text-primary)';
                                if (answeredState.selected !== null) {
                                    if (idx === QUIZ_QUESTIONS[currentQuestion].answer) {
                                        bg = 'var(--accent-green)'; // Correct answer highlights green
                                        color = '#000';
                                    } else if (idx === answeredState.selected) {
                                        bg = 'var(--accent-pink)'; // Wrong answer highlights pink
                                        color = '#fff';
                                    }
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(idx)}
                                        disabled={answeredState.selected !== null}
                                        style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            borderRadius: '8px',
                                            border: '2px solid var(--text-primary)',
                                            background: bg,
                                            color: color,
                                            cursor: answeredState.selected === null ? 'pointer' : 'default',
                                            fontWeight: 'bold',
                                            fontFamily: 'inherit'
                                        }}
                                    >
                                        {option}
                                    </button>
                                )
                            })}
                        </div>

                        {answeredState.selected !== null && (
                            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.05)', borderRadius: '8px' }}>
                                <p><b>{answeredState.isCorrect ? "✅ Correct!" : "❌ Incorrect."}</b> {QUIZ_QUESTIONS[currentQuestion].explanation}</p>
                                <button
                                    className="nav-btn"
                                    style={{ marginTop: '1rem', display: 'inline-block' }}
                                    onClick={nextQuestion}
                                >
                                    {currentQuestion + 1 === QUIZ_QUESTIONS.length ? "Finish Quiz" : "Next Question ➡️"}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="solution-card text-center">
                <h2>Need more help?</h2>
                <p className="mt-4">Paste your specific error in the Home tab to get a step-by-step fix!</p>
                <a href="/" className="nav-btn" style={{ display: "inline-block", marginTop: "1rem" }}>Go to Solver</a>
            </div>
        </div>
    );
}
