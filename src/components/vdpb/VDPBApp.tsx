'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import VDPB_DATA_RAW from '@/data/vdpb/vdpb_data.json';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Problem {
    text: string;
    names: string[];
}
interface VDPBProduct {
    idea: string;
    problems: Problem[];
    formats: string[];
    handouts: string[];
    mockup_url?: string;
}
type NicheData = Record<string, VDPBProduct[]>;

const VDPB_DATA = VDPB_DATA_RAW as NicheData;

// ─── Metadata Maps (from original HTML) ───────────────────────────────────────
const EMOJIS: Record<string, string> = {
    "Busy Parents": "👨‍👩‍👧", "Aspiring Entrepreneurs": "🚀", "Solopreneurs  Freelancers": "💼",
    "Coaches & Consultants": "🎯", "Personal Development   Self-Imp": "🌱",
    "Health & Fitness Enthusiasts": "💪", "Mindfulness & Spiritual Growth": "🧘",
    "Stress & Anxiety Management": "🌿", "Body Positivity &  Self-Love Ad": "💖",
    "Relationship & Dating Advice": "❤️", "Navigating  Divorce  Breakups": "🌅",
    "Career Changers": "🔄", "Midlife Transitions": "✨", "People Seeking Side Hustles": "💰",
    "Financial Coaching  & Budgeting": "📊", "Investing & Wealth Building": "📈",
    "Bloggers & Content Creators": "✍️", "Aspiring Influencers": "📱",
    "Podcasters & Broadcasters": "🎙️", "Online Course Creators  Members": "🎓",
    "E-commerce Store Owners": "🛍️", "Handmade  Craft  Business Owner": "🎨",
    "Digital Marketing Pros": "📣", "Virtual Assistants & Online  Se": "🖥️",
    "Authors  Writers": "📚", "Event & Wedding Planners": "💒",
    "Photographers & Videographers": "📷", "Interior Designers & Home Organ": "🏠",
    "Non-Profit & Philanthropy Profe": "🤝", "Tech Founders & Innovators  (Sa": "💡",
    "Travel Bloggers   Travel Coache": "✈️", "Sustainable Living   Eco-Friend": "🌍",
    "Beauty  Skincare Experts": "💄", "Holistic  Alternative  Health P": "🌿",
    "Personal Stylists  Image Consul": "👗", "Individuals with Chronic Illnes": "💙",
    "Pet Care & Animal Lovers": "🐾", "Foodies & Culinary Enthusiasts": "🍳",
    "Gamers & Esports Enthusiasts": "🎮", "Spiritual Entrepreneurs": "🔮",
    "Students & Recent Grads": "🎓", "Networking & Mastermind Communi": "🤝",
    "Confidence & Assertiveness Trai": "💪", "Language Learners & Polyglots": "🌐",
    "Relationship-Building & Conflic": "🤲", "Local  Community- Based Busines": "🏘️",
    "LGBTQ+ Support & Advocacy": "🌈", "Remote Workers & Digital Nomads": "🌍",
    "Home Owners   DIY Improvement": "🔨", "Hobbyists & Lifelong Learners": "🎯"
};

const DISPLAY: Record<string, string> = {
    "Busy Parents": "Busy Parents", "Aspiring Entrepreneurs": "Aspiring Entrepreneurs",
    "Solopreneurs  Freelancers": "Solopreneurs & Freelancers",
    "Coaches & Consultants": "Coaches & Consultants",
    "Personal Development   Self-Imp": "Personal Development",
    "Health & Fitness Enthusiasts": "Health & Fitness",
    "Mindfulness & Spiritual Growth": "Mindfulness & Spirituality",
    "Stress & Anxiety Management": "Stress & Anxiety",
    "Body Positivity &  Self-Love Ad": "Body Positivity & Self-Love",
    "Relationship & Dating Advice": "Relationships & Dating",
    "Navigating  Divorce  Breakups": "Divorce & Breakups",
    "Career Changers": "Career Changers", "Midlife Transitions": "Midlife Transitions",
    "People Seeking Side Hustles": "Side Hustles",
    "Financial Coaching  & Budgeting": "Financial Coaching",
    "Investing & Wealth Building": "Investing & Wealth",
    "Bloggers & Content Creators": "Content Creators",
    "Aspiring Influencers": "Aspiring Influencers",
    "Podcasters & Broadcasters": "Podcasters",
    "Online Course Creators  Members": "Course Creators",
    "E-commerce Store Owners": "E-commerce Owners",
    "Handmade  Craft  Business Owner": "Handmade & Craft",
    "Digital Marketing Pros": "Digital Marketing",
    "Virtual Assistants & Online  Se": "Virtual Assistants",
    "Authors  Writers": "Authors & Writers",
    "Event & Wedding Planners": "Event & Wedding Planners",
    "Photographers & Videographers": "Photographers & Video",
    "Interior Designers & Home Organ": "Interior Design & Organizing",
    "Non-Profit & Philanthropy Profe": "Non-Profits & Philanthropy",
    "Tech Founders & Innovators  (Sa": "Tech Founders & SaaS",
    "Travel Bloggers   Travel Coache": "Travel Bloggers & Coaches",
    "Sustainable Living   Eco-Friend": "Sustainable Living",
    "Beauty  Skincare Experts": "Beauty & Skincare",
    "Holistic  Alternative  Health P": "Holistic Health",
    "Personal Stylists  Image Consul": "Personal Stylists",
    "Individuals with Chronic Illnes": "Chronic Illness & Disability",
    "Pet Care & Animal Lovers": "Pet Care & Animals",
    "Foodies & Culinary Enthusiasts": "Foodies & Culinary",
    "Gamers & Esports Enthusiasts": "Gaming & Esports",
    "Spiritual Entrepreneurs": "Spiritual Entrepreneurs",
    "Students & Recent Grads": "Students & Grads",
    "Networking & Mastermind Communi": "Networking & Masterminds",
    "Confidence & Assertiveness Trai": "Confidence & Assertiveness",
    "Language Learners & Polyglots": "Language Learners",
    "Relationship-Building & Conflic": "Conflict & Communication",
    "Local  Community- Based Busines": "Local & Community Business",
    "LGBTQ+ Support & Advocacy": "LGBTQ+ Support",
    "Remote Workers & Digital Nomads": "Remote Work & Nomads",
    "Home Owners   DIY Improvement": "Home & DIY",
    "Hobbyists & Lifelong Learners": "Hobbyists & Learners"
};

const FORMATS = [
    { icon: '📘', name: 'Ebook / PDF Guide' },
    { icon: '🎓', name: 'Online Course' },
    { icon: '⚡', name: 'Mini Course' },
    { icon: '📝', name: 'Workbook' },
    { icon: '📋', name: 'Template Pack' },
    { icon: '✅', name: 'Checklist Bundle' },
    { icon: '🧰', name: 'Toolkit' },
    { icon: '🎧', name: 'Audio Program' },
    { icon: '🎬', name: 'Video Series' },
    { icon: '🗓️', name: 'Planner / Journal' },
];

const HANDOUTS = [
    'Printables', 'Worksheets', 'Checklists', 'Templates',
    'Swipe Files', 'Cheat Sheets', 'Journal Pages',
    'Action Plans', 'Scripts & Prompts', 'Trackers',
    'Resource Guides', 'Email Sequences'
];

const STEPS = ['Choose Niche', 'Product Idea', 'Specific Problem', 'Name Your Product', 'Format & Resources'];
const NICHE_KEYS = Object.keys(VDPB_DATA);

// ─── Confetti ─────────────────────────────────────────────────────────────────
function launchConfetti() {
    const colors = ['#BE185D', '#DB2777', '#FFD900', '#FFFFFF', '#F43F5E'];
    const container = document.body;
    for (let i = 0; i < 60; i++) {
        const piece = document.createElement('div');
        piece.style.cssText = `
      position:fixed; width:8px; height:8px; border-radius:2px; z-index:9998;
      left:${Math.random() * 100}vw; top:-20px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation: confetti-fall ${1.5 + Math.random() * 2}s linear ${Math.random() * 0.5}s forwards;
      opacity:1;
    `;
        container.appendChild(piece);
        setTimeout(() => piece.remove(), 4000);
    }
}

// ─── Password Gate ─────────────────────────────────────────────────────────────
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
    const [pw, setPw] = useState('');
    const [err, setErr] = useState('');
    const [showPw, setShowPw] = useState(false);

    const check = async () => {
        const res = await fetch('/api/vdpb/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: pw }),
        });
        if (res.ok) {
            onUnlock();
        } else {
            setErr('Incorrect password. Please try again.');
            setPw('');
            setTimeout(() => setErr(''), 3000);
        }
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'linear-gradient(135deg,#fff1f2 0%,#fdf2f8 50%,#fffbeb 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Poppins', sans-serif"
        }}>
            <div style={{
                background: 'white', borderRadius: 28, padding: '48px 40px',
                boxShadow: '0 25px 60px rgba(190,24,93,0.15)', maxWidth: 420, width: '90%', textAlign: 'center'
            }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>
                    Viral Product Builder
                </h2>
                <p style={{ color: '#64748B', marginBottom: 32, fontSize: 15, lineHeight: 1.5 }}>
                    Enter your access password to continue
                </p>
                <div style={{ position: 'relative', marginBottom: 12 }}>
                    <input
                        type={showPw ? 'text' : 'password'}
                        value={pw}
                        onChange={e => setPw(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && check()}
                        placeholder="Password"
                        style={{
                            width: '100%', padding: '16px 52px 16px 20px',
                            border: '2px solid #E2E8F0', borderRadius: 100,
                            fontFamily: "'Poppins', sans-serif", fontSize: 15,
                            outline: 'none', boxSizing: 'border-box',
                            transition: 'border-color 0.2s'
                        }}
                        onFocus={e => e.target.style.borderColor = '#DB2777'}
                        onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        style={{
                            position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                            background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#94A3B8'
                        }}
                    >
                        {showPw ? '🙈' : '👁️'}
                    </button>
                </div>
                {err && <p style={{ color: '#F43F5E', fontSize: 13, marginBottom: 12, minHeight: 20 }}>{err}</p>}
                <button
                    onClick={check}
                    style={{
                        width: '100%', padding: '16px 0',
                        background: 'linear-gradient(135deg, #BE185D 0%, #DB2777 50%, #FFD900 100%)',
                        color: 'white', border: 'none', borderRadius: 100,
                        fontFamily: "'Poppins', sans-serif", fontSize: 15, fontWeight: 600,
                        cursor: 'pointer', boxShadow: '0 6px 24px rgba(190,24,93,0.35)',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 10px 36px rgba(190,24,93,0.45)')}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 6px 24px rgba(190,24,93,0.35)')}
                >
                    Unlock ✨
                </button>
            </div>
        </div>
    );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function VDPBApp() {
    const [unlocked, setUnlocked] = useState(false);
    const [step, setStep] = useState(1);
    const [searchQ, setSearchQ] = useState('');

    const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<VDPBProduct | null>(null);
    const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
    const [productName, setProductName] = useState('');
    const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
    const [selectedHandouts, setSelectedHandouts] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);

    // Confetti style injection
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
      @keyframes confetti-fall {
        0%   { opacity:1; transform:translateY(-20px) rotate(0deg); }
        100% { opacity:0; transform:translateY(100vh) rotate(720deg); }
      }
    `;
        document.head.appendChild(style);
        return () => { document.head.removeChild(style); };
    }, []);

    // Auto-launch confetti on step 6 (result)
    useEffect(() => {
        if (step === 6) launchConfetti();
    }, [step]);

    const goTo = useCallback((s: number) => {
        setStep(s);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const selectNiche = (niche: string) => {
        setSelectedNiche(niche);
        setSelectedProduct(null);
        setSelectedProblem(null);
        setProductName('');
        setSelectedFormats([]);
        setSelectedHandouts([]);
        goTo(2);
    };

    const selectProduct = (prod: VDPBProduct) => {
        setSelectedProduct(prod);
        setSelectedProblem(null);
        setProductName('');
        setTimeout(() => goTo(3), 300);
    };

    const selectProblem = (prob: Problem) => {
        setSelectedProblem(prob);
        setProductName(prob.names[0] || '');
        setTimeout(() => goTo(4), 300);
    };

    const toggleFormat = (fmt: string) => {
        setSelectedFormats(prev =>
            prev.includes(fmt) ? prev.filter(f => f !== fmt) : [...prev, fmt]
        );
    };

    const toggleHandout = (h: string) => {
        setSelectedHandouts(prev => {
            if (prev.includes(h)) return prev.filter(x => x !== h);
            if (prev.length >= 3) return [...prev.slice(1), h]; // FIFO cap at 3
            return [...prev, h];
        });
    };

    const resetAll = () => {
        setStep(1); setSearchQ('');
        setSelectedNiche(null); setSelectedProduct(null); setSelectedProblem(null);
        setProductName(''); setSelectedFormats([]); setSelectedHandouts([]);
    };

    const copyResult = () => {
        const text = [
            `Niche: ${DISPLAY[selectedNiche!] || selectedNiche}`,
            `Product: ${selectedProduct?.idea}`,
            `Problem: ${selectedProblem?.text}`,
            `Name: ${productName}`,
            `Formats: ${selectedFormats.join(', ')}`,
            `Bonus Handouts: ${selectedHandouts.join(', ')}`,
        ].join('\n');
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    // Always use the global FORMATS list (matching original HTML behaviour)
    const formatOptions = FORMATS;

    // Handout options — always use global HANDOUTS (matching original HTML)
    const handoutOptions = HANDOUTS;

    // Filtered niches
    const filteredNiches = NICHE_KEYS.filter(n =>
        !searchQ || (DISPLAY[n] || n).toLowerCase().includes(searchQ.toLowerCase())
    );

    if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

    return (
        <div className="app">
            {/* Header */}
            <div className="header">
                <div className="header-badge">
                    <div className="dot" />
                    50 Niches · 500 Product Ideas
                </div>
                <h1>Viral Digital Product<br />Builder</h1>
                <p>Discover your perfect digital product in 5 steps. Choose your niche, define the problem, and launch with confidence.</p>
            </div>

            {/* Progress Pills */}
            <div className="progress-container">
                {STEPS.map((label, i) => {
                    const num = i + 1;
                    const state = step > num ? 'done' : step === num ? 'active' : 'inactive';
                    return (
                        <React.Fragment key={num}>
                            <div className={`step-pill ${state}`}>
                                <div className="num">{state === 'done' ? '' : num}</div>
                                {label}
                            </div>
                            {i < STEPS.length - 1 && <div className={`step-divider ${step > num ? 'done' : ''}`} />}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* ── Step 1: Niche ──────────────────────────────────────────── */}
            {step === 1 && (
                <div className="screen active">
                    <div className="section-header">
                        <div className="section-label">✦ Step 1 of 5</div>
                        <h2>Choose Your Niche</h2>
                        <p>Select the audience you want to serve. Each niche has 10 ready-to-sell product ideas.</p>
                    </div>
                    <div className="search-wrap">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search niches..."
                            value={searchQ}
                            onChange={e => setSearchQ(e.target.value)}
                        />
                    </div>
                    <div className="niche-grid">
                        {filteredNiches.map(niche => (
                            <div
                                key={niche}
                                className={`niche-card${selectedNiche === niche ? ' selected' : ''}`}
                                onClick={() => selectNiche(niche)}
                            >
                                <span className="niche-emoji">{EMOJIS[niche] || '📌'}</span>
                                <div className="niche-name">{DISPLAY[niche] || niche}</div>
                                <div className="niche-count">{(VDPB_DATA[niche] || []).length} ideas</div>
                            </div>
                        ))}
                        {filteredNiches.length === 0 && (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px 20px', color: '#94A3B8' }}>
                                No niches match your search.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── Step 2: Product Idea ───────────────────────────────────── */}
            {step === 2 && selectedNiche && (
                <div className="screen active">
                    {/* Breadcrumb */}
                    <div className="selection-bar">
                        <span className="sel-label">Niche</span>
                        <span className="sel-sep">›</span>
                        <span className="sel-value">{DISPLAY[selectedNiche] || selectedNiche}</span>
                    </div>
                    <div className="section-header">
                        <div className="section-label">✦ Step 2 of 5</div>
                        <h2>Choose a Product Idea</h2>
                        <p>Each idea is proven to sell in this niche. Pick the one that fits your style.</p>
                    </div>
                    <div className="product-list">
                        {(VDPB_DATA[selectedNiche] || []).map((prod, i) => (
                            <div
                                key={i}
                                className={`product-card${selectedProduct === prod ? ' selected' : ''}`}
                                onClick={() => selectProduct(prod)}
                            >
                                <div className="product-card-content">
                                    <h3>{prod.idea}</h3>
                                    <p>{prod.problems[0]?.text}</p>
                                </div>
                                <div className="card-arrow">›</div>
                            </div>
                        ))}
                    </div>
                    <div className="screen-nav">
                        <button className="btn btn-secondary" onClick={() => goTo(1)}>‹ Back to Niches</button>
                    </div>
                </div>
            )}

            {/* ── Step 3: Problem ────────────────────────────────────────── */}
            {step === 3 && selectedProduct && (
                <div className="screen active">
                    {/* Breadcrumb */}
                    <div className="selection-bar">
                        <span className="sel-label">Niche</span>
                        <span className="sel-sep">›</span>
                        <span className="sel-value">{DISPLAY[selectedNiche!] || selectedNiche}</span>
                        <span className="sel-sep">›</span>
                        <span className="sel-label">Product</span>
                        <span className="sel-sep">›</span>
                        <span className="sel-value">{selectedProduct.idea}</span>
                    </div>
                    <div className="section-header">
                        <div className="section-label">✦ Step 3 of 5</div>
                        <h2>Who Exactly Are You Helping?</h2>
                        <p>Narrow down to the specific version of the problem you'll solve. This makes your product irresistible.</p>
                    </div>
                    <div className="problem-grid">
                        {selectedProduct.problems.map((prob, i) => (
                            <div
                                key={i}
                                className={`problem-card${selectedProblem === prob ? ' selected' : ''}`}
                                onClick={() => selectProblem(prob)}
                            >
                                <div className="problem-check">✓</div>
                                <div className="problem-text">{prob.text}</div>
                            </div>
                        ))}
                    </div>
                    <div className="screen-nav">
                        <button className="btn btn-secondary" onClick={() => goTo(2)}>‹ Back to Ideas</button>
                    </div>
                </div>
            )}

            {/* ── Step 4: Name ───────────────────────────────────────────── */}
            {step === 4 && selectedProblem && (
                <div className="screen active">
                    {/* Breadcrumb */}
                    <div className="selection-bar">
                        <span className="sel-label">Problem</span>
                        <span className="sel-sep">›</span>
                        <span className="sel-value">{selectedProblem.text}</span>
                    </div>
                    <div className="section-header" style={{ maxWidth: 680 }}>
                        <div className="section-label">✦ Step 4 of 5</div>
                        <h2>Name Your Product</h2>
                        <p>Choose from our high-converting suggestions or write your own title below.</p>
                    </div>
                    <div className="name-section">
                        {selectedProblem.names.slice(0, 3).map((name, i) => (
                            <div
                                key={i}
                                className="name-suggestion"
                                onClick={() => setProductName(name)}
                            >
                                <span className="suggestion-icon">💡</span>
                                <div className="suggestion-text">
                                    <div className="suggestion-label">Suggestion {i + 1}</div>
                                    <div className="suggestion-value">{name}</div>
                                </div>
                                <span className="suggestion-use">Use this</span>
                            </div>
                        ))}
                        <div className="name-input-wrap">
                            <textarea
                                rows={2}
                                placeholder="Or type your own product name..."
                                value={productName}
                                onChange={e => setProductName(e.target.value)}
                            />
                        </div>
                        <p className="char-hint">Aim for 6–12 words with a clear outcome promise.</p>
                    </div>
                    <div className="screen-nav" style={{ maxWidth: 680 }}>
                        <button className="btn btn-secondary" onClick={() => goTo(3)}>‹ Back</button>
                        <button
                            className="btn btn-primary"
                            disabled={!productName.trim()}
                            onClick={() => goTo(5)}
                        >
                            Choose Format ›
                        </button>
                    </div>
                </div>
            )}

            {/* ── Step 5: Format & Resources ─────────────────────────────── */}
            {step === 5 && (
                <div className="screen active">
                    <div className="section-header">
                        <div className="section-label">✦ Step 5 of 5</div>
                        <h2>Format & Bonus Resources</h2>
                        <p>Pick how you'll deliver your product, then add up to 3 bonus resources to increase perceived value.</p>
                    </div>

                    {/* Format grid */}
                    <div style={{ marginBottom: 40 }}>
                        <div className="label-section" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <span className="section-label" style={{ margin: 0 }}>Product Format</span>
                            <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #E2E8F0' }} />
                        </div>
                        <div className="format-grid">
                            {formatOptions.map((f, i) => (
                                <div
                                    key={i}
                                    className={`format-chip${selectedFormats.includes(f.name) ? ' selected' : ''}`}
                                    onClick={() => toggleFormat(f.name)}
                                >
                                    <div className="format-icon">{f.icon}</div>
                                    <div className="format-name">{f.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Handouts */}
                    <div>
                        <div className="label-section" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <span className="section-label" style={{ margin: 0 }}>Bonus Handouts (choose up to 3)</span>
                            <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #E2E8F0' }} />
                        </div>
                        <div className="handouts-grid">
                            {handoutOptions.map((h, i) => (
                                <div
                                    key={i}
                                    className={`handout-tag${selectedHandouts.includes(h) ? ' selected' : ''}`}
                                    onClick={() => toggleHandout(h)}
                                >
                                    {h}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="screen-nav">
                        <button className="btn btn-secondary" onClick={() => goTo(4)}>‹ Back</button>
                        <button
                            className="btn btn-primary"
                            disabled={selectedFormats.length === 0}
                            onClick={() => goTo(6)}
                        >
                            Build My Product ✨
                        </button>
                    </div>
                </div>
            )}

            {/* ── Step 6: Result ─────────────────────────────────────────── */}
            {step === 6 && (
                <div className="screen active">
                    <div className="result-card">
                        <div className="result-header">
                            <div className="result-check">🎉</div>
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, background: 'linear-gradient(135deg, #BE185D 0%, #DB2777 50%, #FFD900 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                Your Product Is Ready!
                            </h2>
                            <p style={{ color: '#64748B', marginTop: 8 }}>Here's your complete viral digital product brief</p>
                        </div>

                        <div style={{ marginBottom: 32 }}>
                            {/* Niche */}
                            <div style={{ padding: '16px 0', display: 'flex', gap: 16 }}>
                                <span style={{ width: 120, flexShrink: 0, fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: 2 }}>Niche</span>
                                <span style={{ fontWeight: 600, color: '#1E293B' }}>{DISPLAY[selectedNiche!] || selectedNiche}</span>
                            </div>
                            <div className="result-divider" />

                            {/* Product */}
                            <div style={{ padding: '16px 0', display: 'flex', gap: 16 }}>
                                <span style={{ width: 120, flexShrink: 0, fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: 2 }}>Product Idea</span>
                                <span style={{ fontWeight: 600, color: '#1E293B' }}>{selectedProduct?.idea}</span>
                            </div>
                            <div className="result-divider" />

                            {/* Problem */}
                            <div style={{ padding: '16px 0', display: 'flex', gap: 16 }}>
                                <span style={{ width: 120, flexShrink: 0, fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: 2 }}>Target Problem</span>
                                <span style={{ fontWeight: 600, color: '#1E293B' }}>{selectedProblem?.text}</span>
                            </div>
                            <div className="result-divider" />

                            {/* Name */}
                            <div style={{ padding: '16px 0', display: 'flex', gap: 16 }}>
                                <span style={{ width: 120, flexShrink: 0, fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: 2 }}>Product Name</span>
                                <span className="result-value large" style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>
                                    {productName}
                                </span>
                            </div>
                            <div className="result-divider" />

                            {/* Formats */}
                            <div style={{ padding: '16px 0', display: 'flex', gap: 16 }}>
                                <span style={{ width: 120, flexShrink: 0, fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: 6 }}>Format</span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {selectedFormats.map((f, i) => (
                                        <span key={i} className="result-tag">{f}</span>
                                    ))}
                                </div>
                            </div>

                            {selectedHandouts.length > 0 && (
                                <>
                                    <div className="result-divider" />
                                    <div style={{ padding: '16px 0', display: 'flex', gap: 16 }}>
                                        <span style={{ width: 120, flexShrink: 0, fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: 6 }}>Bonus Handouts</span>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                            {selectedHandouts.map((h, i) => (
                                                <span key={i} className="result-tag amber">🎁 {h}</span>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Mockup link */}
                            {selectedProduct?.mockup_url && (
                                <>
                                    <div className="result-divider" />
                                    <div style={{ padding: '16px 0', display: 'flex', gap: 16 }}>
                                        <span style={{ width: 120, flexShrink: 0, fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: 6 }}>Mockup</span>
                                        <a href={selectedProduct.mockup_url} target="_blank" rel="noopener noreferrer" style={{ color: '#DB2777', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                                            Create Your Mockup →
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            <button className="btn btn-primary" onClick={copyResult} style={{ flex: 1, minWidth: 160, justifyContent: 'center' }}>
                                {copied ? '✅ Copied!' : '📋 Copy Brief'}
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={resetAll}
                            >
                                🔄 Start Over
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
