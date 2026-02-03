import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Card() {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [imageError, setImageError] = useState(false);

  const tagline = 'Content Writer for People-Driven Brands';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= tagline.length) {
        setTypedText(tagline.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTypingComplete(true);
      }
    }, 55);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!typingComplete) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document
      .querySelectorAll('.observe-section')
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [typingComplete]);

  const facts = [
    {
      title: 'Writer Off the Clock',
      text: "I write to organize my thinking, not to be this generation's Hemingway.",
    },
    {
      title: 'Live Music Junkie',
      text: 'I spend too much money on live music.',
    },
    {
      title: 'Aimless Walker',
      text: 'I spend too much time walking. No destination, just sorta wandering.',
    },
    {
      title: 'Outside > Inside',
      text: 'I like being outside more than I like being inside.',
    },
    {
      title: 'Forever Freelancer',
      text: "I've never had a full-time job \u2014 been a freelancer my entire adult life, and I'm working hard to make that sustainable for myself (and others).",
    },
  ];

  const links = [
    {
      title: 'Content Writing Packages',
      subtitle: 'Newsletters + LinkedIn',
      url: 'http://extractyourcontent.com/',
    },
    {
      title: 'My Writing',
      subtitle: 'Substack',
      url: 'https://kylejennings.substack.com/',
    },
    {
      title: 'LinkedIn',
      subtitle: "Let's connect",
      url: 'https://www.linkedin.com/in/kyledjennings/',
    },
  ];

  return (
    <>
      <Head>
        <title>Kyle Jennings &mdash; Content Writer</title>
        <meta
          name="description"
          content="Content Writer for people-driven brands. Newsletters + LinkedIn. Based in Denver, CO."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Kyle Jennings — Content Writer" />
        <meta
          property="og:description"
          content="Content Writer for people-driven brands. Newsletters + LinkedIn. Based in Denver, CO."
        />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="page-wrapper">
        {/* HERO */}
        <section className="hero">
          <div className="hero-inner">
            <div className="profile-wrapper">
              <div className="profile-fallback">KJ</div>
              {!imageError && (
                <img
                  src="/kyle-profile.jpg"
                  alt="Kyle Jennings"
                  className="profile-img"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <h1 className="name">Kyle Jennings</h1>
            <p className="tagline">
              {typedText}
              <span className={`cursor ${showCursor ? 'on' : ''}`}>|</span>
            </p>
            <p className="location">
              Denver, CO &mdash; Originally from Long Island, NY
            </p>
          </div>
          {typingComplete && (
            <div className="scroll-hint">
              <span className="scroll-arrow">&darr;</span>
            </div>
          )}
        </section>

        {/* ABOUT */}
        <section id="about" className="section observe-section">
          <div
            className={`section-content ${visibleSections.has('about') ? 'visible' : ''}`}
          >
            <h2 className="section-title">A Few Things About Me</h2>
            <div className="card-grid">
              {facts.map((fact, i) => (
                <div
                  key={i}
                  className="card"
                  style={{ transitionDelay: `${i * 100 + 100}ms` }}
                >
                  <h3 className="card-heading">{fact.title}</h3>
                  <p className="card-text">{fact.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LINKS */}
        <section id="connect" className="section observe-section">
          <div
            className={`section-content ${visibleSections.has('connect') ? 'visible' : ''}`}
          >
            <h2 className="section-title">Let&apos;s Work Together</h2>
            <div className="links-list">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                  style={{ transitionDelay: `${i * 120 + 100}ms` }}
                >
                  <div className="link-info">
                    <span className="link-title">{link.title}</span>
                    <span className="link-subtitle">{link.subtitle}</span>
                  </div>
                  <span className="link-arrow">&rarr;</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <p className="footer-text">No destination, just sorta wandering.</p>
        </footer>
      </div>

      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Roboto, sans-serif;
          background: #faf7f2;
          color: #2d2926;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }
      `}</style>

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
        }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
        }
        .hero-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 600px;
        }

        .profile-wrapper {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 2rem;
          box-shadow: 0 8px 30px rgba(45, 41, 38, 0.12);
          border: 4px solid rgba(196, 93, 62, 0.15);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          position: relative;
          flex-shrink: 0;
        }
        .profile-wrapper:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 40px rgba(45, 41, 38, 0.18);
        }
        .profile-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 3.5rem;
          color: #c45d3e;
          background: #f0e8df;
        }
        .profile-img {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .name {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(2.5rem, 6vw, 3.5rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
          color: #2d2926;
        }
        .tagline {
          font-size: clamp(1.05rem, 2.5vw, 1.3rem);
          color: #c45d3e;
          font-weight: 500;
          min-height: 1.6em;
          margin-bottom: 1rem;
        }
        .cursor {
          opacity: 0;
          font-weight: 300;
          color: #c45d3e;
          transition: opacity 0.08s;
        }
        .cursor.on {
          opacity: 1;
        }
        .location {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #a69585;
          font-weight: 400;
        }

        .scroll-hint {
          position: absolute;
          bottom: 2rem;
          animation: bounce 2s ease infinite;
        }
        .scroll-arrow {
          font-size: 1.5rem;
          color: #a69585;
        }
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-12px);
          }
          60% {
            transform: translateY(-6px);
          }
        }

        /* ── SECTIONS ── */
        .section {
          padding: 5rem 2rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .section-content {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .section-content.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .section-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(1.8rem, 4vw, 2.2rem);
          font-weight: 400;
          margin-bottom: 2.5rem;
          text-align: center;
          color: #2d2926;
        }

        /* ── CARDS ── */
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }
        .card {
          background: #fff;
          border-radius: 12px;
          padding: 1.75rem;
          box-shadow: 0 2px 12px rgba(45, 41, 38, 0.06);
          border: 1px solid rgba(45, 41, 38, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 0;
          transform: translateY(20px);
        }
        .section-content.visible .card {
          opacity: 1;
          transform: translateY(0);
          transition: transform 0.3s ease, box-shadow 0.3s ease,
            opacity 0.5s ease;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(45, 41, 38, 0.1);
        }
        .card-heading {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 1.15rem;
          font-weight: 400;
          margin-bottom: 0.6rem;
          color: #c45d3e;
        }
        .card-text {
          font-size: 0.95rem;
          line-height: 1.65;
          color: #5a524c;
        }

        /* ── LINKS ── */
        .links-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .link-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #2d2926;
          color: #faf7f2;
          padding: 1.5rem 2rem;
          border-radius: 12px;
          text-decoration: none;
          transition: background 0.3s ease, transform 0.3s ease;
          opacity: 0;
          transform: translateY(20px);
        }
        .section-content.visible .link-card {
          opacity: 1;
          transform: translateY(0);
          transition: background 0.3s ease, transform 0.3s ease,
            opacity 0.5s ease;
        }
        .link-card:hover {
          background: #c45d3e;
          transform: translateY(-2px);
        }
        .link-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .link-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 1.2rem;
          font-weight: 400;
        }
        .link-subtitle {
          font-size: 0.85rem;
          opacity: 0.7;
        }
        .link-arrow {
          font-size: 1.5rem;
          transition: transform 0.3s ease;
        }
        .link-card:hover .link-arrow {
          transform: translateX(6px);
        }

        /* ── FOOTER ── */
        .footer {
          text-align: center;
          padding: 3rem 2rem;
          border-top: 1px solid rgba(45, 41, 38, 0.08);
          max-width: 800px;
          margin: 0 auto;
        }
        .footer-text {
          font-style: italic;
          color: #a69585;
          font-size: 0.95rem;
        }

        /* ── MOBILE ── */
        @media (max-width: 480px) {
          .profile-wrapper {
            width: 140px;
            height: 140px;
          }
          .profile-fallback {
            font-size: 2.8rem;
          }
          .card-grid {
            grid-template-columns: 1fr;
          }
          .link-card {
            padding: 1.25rem 1.5rem;
          }
          .section {
            padding: 3.5rem 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
