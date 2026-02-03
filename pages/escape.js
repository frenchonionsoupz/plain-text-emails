import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import styles from '../styles/escape.module.css';

/* -------------------------------------------------------
   ESCAPE THE ALGORITHM — Interactive Landing Page
   ------------------------------------------------------- */

// ---------- Intersection Observer Hook ----------
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

// ---------- Typewriter component ----------
function Typewriter({ text, speed = 40, startDelay = 0, onDone }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      onDone && onDone();
      return;
    }
    const t = setTimeout(
      () => setDisplayed(text.slice(0, displayed.length + 1)),
      speed
    );
    return () => clearTimeout(t);
  }, [started, displayed, text, speed, onDone]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && (
        <span style={{ borderRight: '2px solid #ff6b35', marginLeft: 2, animation: 'blink 0.8s step-end infinite' }}>
          &nbsp;
        </span>
      )}
    </span>
  );
}

// ---------- Animated counter ----------
function AnimatedCounter({ end, duration = 2000, active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, end, duration]);

  return <>{count.toLocaleString()}</>;
}

// ---------- Main Page ----------
export default function EscapeLanding() {
  const [navVisible, setNavVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [sigName, setSigName] = useState('');
  const [declared, setDeclared] = useState(false);
  const [escapeeCount, setEscapeeCount] = useState(0);

  // Section reveal refs
  const [startRef, startVisible] = useReveal();
  const [planRef, planVisible] = useReveal();
  const [kitRef, kitVisible] = useReveal();
  const [caseRef, caseVisible] = useReveal();
  const [newsRef, newsVisible] = useReveal();
  const [declRef, declVisible] = useReveal();
  const [counterRef, counterVisible] = useReveal();

  // Nav appears after scrolling past the hero
  useEffect(() => {
    const onScroll = () => setNavVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Simulated "escapee" counter from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('escapeeCount');
    const base = stored ? parseInt(stored, 10) : 11247;
    setEscapeeCount(base);
  }, []);

  const handleEmailSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email.trim()) return;
      setEmailSubmitted(true);
    },
    [email]
  );

  const handleDeclare = useCallback(() => {
    if (!sigName.trim()) return;
    setDeclared(true);
    const next = escapeeCount + 1;
    setEscapeeCount(next);
    localStorage.setItem('escapeeCount', String(next));
  }, [sigName, escapeeCount]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>Escape The Algorithm</title>
        <meta
          name="description"
          content="Break free from algorithmic control. Reclaim your attention, your choices, and your digital independence."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.escapePage}>
        {/* Prison bar overlay */}
        <div className={styles.prisonBars} />

        {/* ---------- STICKY NAV ---------- */}
        <nav
          className={`${styles.navBar} ${navVisible ? styles.navBarVisible : ''}`}
          aria-label="Section navigation"
        >
          <span className={styles.navLogo}>ETA</span>
          <ul className={styles.navLinks}>
            {[
              ['start', 'Start'],
              ['plan', 'Plan'],
              ['kit', 'Kit'],
              ['case', 'Why'],
              ['newsletter', 'Newsletter'],
              ['declare', 'Declare'],
            ].map(([id, label]) => (
              <li key={id}>
                <a onClick={() => scrollTo(id)} tabIndex={0} role="button">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ---------- HERO ---------- */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Escape<br />The Algorithm
          </h1>
          <p className={styles.heroSubtitle}>
            <Typewriter text="// INITIATE BREAKOUT SEQUENCE" speed={50} startDelay={800} />
          </p>
          <p className={styles.heroTagline}>
            You&rsquo;ve been living in a cell built from feeds, notifications, and
            dopamine loops. The door was never locked&mdash;you just forgot it was there.
          </p>
          <div className={styles.scrollIndicator}>
            <span>Begin Escape</span>
            <div className={styles.scrollArrow} />
          </div>
        </section>

        <div className={styles.sectionDivider} />

        {/* ---------- 01 — START HERE ---------- */}
        <section
          id="start"
          ref={startRef}
          className={`${styles.section} ${styles.startHere} ${styles.sectionHidden} ${startVisible ? styles.sectionVisible : ''}`}
        >
          <div className={styles.startHereIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <span className={styles.sectionNumber}>Phase 01</span>
          <h2 className={styles.sectionTitle}>Start Here</h2>
          <p className={styles.sectionDescription} style={{ margin: '0 auto' }}>
            A perfect starting place for new wannabe-Escapees. No experience required.
            No special skills. Just a willingness to see things differently.
          </p>

          <div className={styles.startHereCards}>
            <div className={styles.startCard}>
              <div className={styles.startCardNumber}>01</div>
              <div className={styles.startCardTitle}>Recognize The Walls</div>
              <div className={styles.startCardDesc}>
                Understand the invisible architecture that keeps you scrolling, clicking, and consuming on autopilot.
              </div>
            </div>
            <div className={styles.startCard}>
              <div className={styles.startCardNumber}>02</div>
              <div className={styles.startCardTitle}>Question The Feed</div>
              <div className={styles.startCardDesc}>
                Learn to distinguish between what you chose and what was chosen for you. The difference will disturb you.
              </div>
            </div>
            <div className={styles.startCard}>
              <div className={styles.startCardNumber}>03</div>
              <div className={styles.startCardTitle}>Plan Your Route</div>
              <div className={styles.startCardDesc}>
                Map out your personal escape. Everyone&rsquo;s breakout looks different&mdash;find the one that fits your life.
              </div>
            </div>
          </div>
        </section>

        <div className={styles.sectionDivider} />

        {/* ---------- 02 — YOUR ESCAPE PLAN ---------- */}
        <section
          id="plan"
          ref={planRef}
          className={`${styles.section} ${styles.escapePlan} ${styles.sectionHidden} ${planVisible ? styles.sectionVisible : ''}`}
        >
          <span className={styles.sectionNumber}>Phase 02</span>
          <h2 className={styles.sectionTitle}>Your Escape Plan</h2>
          <p className={styles.sectionDescription}>
            Educational resources to help you escape. Think of these as the
            blueprints smuggled into your cell.
          </p>

          <div className={styles.blueprintGrid}>
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                  </svg>
                ),
                title: 'The Algorithmic Literacy Guide',
                desc: 'A comprehensive breakdown of how recommendation engines, attention markets, and behavioral prediction work. Know thy enemy.',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                ),
                title: 'Digital Detox Framework',
                desc: 'A structured, step-by-step program for reclaiming your screen time without going full hermit. Practical, gradual, effective.',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                title: 'Privacy & Autonomy Playbook',
                desc: 'Protect your data, your habits, and your decision-making from platforms designed to exploit all three.',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                ),
                title: 'Community Building 101',
                desc: 'Algorithms isolate. Real connections liberate. Learn to build genuine communities outside the walled gardens.',
              },
            ].map((item, i) => (
              <div className={styles.blueprintItem} key={i}>
                <div className={styles.blueprintIcon}>{item.icon}</div>
                <div>
                  <div className={styles.blueprintTitle}>{item.title}</div>
                  <div className={styles.blueprintDesc}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className={styles.sectionDivider} />

        {/* ---------- 03 — YOUR BREAKOUT KIT ---------- */}
        <section
          id="kit"
          ref={kitRef}
          className={`${styles.section} ${styles.breakoutKit} ${styles.sectionHidden} ${kitVisible ? styles.sectionVisible : ''}`}
        >
          <span className={styles.sectionNumber}>Phase 03</span>
          <h2 className={styles.sectionTitle}>Your Breakout Kit</h2>
          <p className={styles.sectionDescription}>
            Tactical resources that can aid your escape. Consider these the lockpicks,
            the rope ladder, and the getaway car.
          </p>

          <div className={styles.kitGrid}>
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                ),
                title: 'Feed Blockers',
                desc: 'Tools to neutralize infinite scroll and recommendation engines.',
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                title: 'Privacy Shields',
                desc: 'Browsers, extensions, and configurations that actually protect you.',
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
                title: 'Time Reclaimers',
                desc: 'Frameworks and apps to take back the hours the algorithm stole.',
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                ),
                title: 'Alt Platforms',
                desc: 'Independent, human-first alternatives to the Big Tech defaults.',
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                  </svg>
                ),
                title: 'Reading Lists',
                desc: 'Curated books, articles, and essays from the escape movement.',
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                ),
                title: 'Open-Source Toolkit',
                desc: 'Code, scripts, and self-hosted solutions for the technically inclined.',
              },
            ].map((item, i) => (
              <div className={styles.kitItem} key={i}>
                <span className={styles.kitIcon}>{item.icon}</span>
                <div className={styles.kitTitle}>{item.title}</div>
                <div className={styles.kitDesc}>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div className={styles.sectionDivider} />

        {/* ---------- 04 — THE CASE FOR ESCAPING ---------- */}
        <section
          id="case"
          ref={caseRef}
          className={`${styles.section} ${styles.caseSection} ${styles.sectionHidden} ${caseVisible ? styles.sectionVisible : ''}`}
        >
          <span className={styles.sectionNumber}>Phase 04</span>
          <h2 className={styles.sectionTitle}>The Case For Escaping</h2>
          <p className={styles.sectionDescription}>
            The &ldquo;why&rdquo; behind all of this. Why it matters so much. Why
            people should want to get on board.
          </p>

          <div className={styles.manifesto}>
            <blockquote className={styles.manifestoQuote}>
              &ldquo;The algorithm doesn&rsquo;t show you what matters. It shows you
              what keeps you staring. There&rsquo;s a billion-dollar difference
              between the two.&rdquo;
            </blockquote>

            <div className={styles.reasonsGrid}>
              {[
                {
                  title: 'Your Attention Is Being Sold',
                  desc: 'Every second you spend in a feed is inventory on an ad exchange. You are not the customer. You are the product being auctioned.',
                },
                {
                  title: 'Your Choices Aren\'t Yours',
                  desc: 'Recommendation engines don\'t serve you options. They serve you outcomes—ones that benefit the platform, not you.',
                },
                {
                  title: 'Your Mental Health Is At Stake',
                  desc: 'Anxiety, comparison, outrage, loneliness—these aren\'t side effects. They\'re engagement features. By design.',
                },
                {
                  title: 'Democracy Needs You Present',
                  desc: 'A society of algorithmically-isolated individuals can\'t self-govern. Shared reality requires shared spaces—not personalized bubbles.',
                },
                {
                  title: 'Creativity Demands Freedom',
                  desc: 'You can\'t create something original when your entire input stream is optimized for sameness and conformity.',
                },
                {
                  title: 'Your Kids Are Watching',
                  desc: 'The next generation will inherit whatever relationship with technology we normalize today. Make it one worth inheriting.',
                },
              ].map((r, i) => (
                <div className={styles.reasonCard} key={i}>
                  <div className={styles.reasonNumber}>{String(i + 1).padStart(2, '0')}</div>
                  <div className={styles.reasonTitle}>{r.title}</div>
                  <div className={styles.reasonDesc}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.sectionDivider} />

        {/* ---------- 05 — THE NEWSLETTER ---------- */}
        <section
          id="newsletter"
          ref={newsRef}
          className={`${styles.section} ${styles.newsletter} ${styles.sectionHidden} ${newsVisible ? styles.sectionVisible : ''}`}
        >
          <span className={styles.sectionNumber}>Phase 05</span>
          <h2 className={styles.sectionTitle}>The Newsletter</h2>
          <p className={styles.sectionDescription} style={{ margin: '0 auto' }}>
            Weekly dispatches from beyond the algorithmic wall. Strategies, stories,
            and signals from fellow Escapees.
          </p>

          <div className={styles.newsletterBox}>
            <div className={styles.newsletterFrequency}>
              Delivered every week &middot; plain text &middot; no tracking pixels
            </div>

            {!emailSubmitted ? (
              <form onSubmit={handleEmailSubmit}>
                <div className={styles.formGroup}>
                  <input
                    type="email"
                    className={styles.emailInput}
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email address"
                  />
                  <button type="submit" className={styles.submitBtn}>
                    Escape
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ color: '#00ff88', fontSize: '1.1rem', fontWeight: 700 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                You&rsquo;re in. Check your inbox for the first dispatch.
              </div>
            )}

            <div className={styles.newsletterNote}>
              No spam. No tracking. Unsubscribe anytime. We respect the
              independence you&rsquo;re fighting for.
            </div>
          </div>
        </section>

        <div className={styles.sectionDivider} />

        {/* ---------- 06 — DECLARE YOUR INDEPENDENCE ---------- */}
        <section
          id="declare"
          ref={declRef}
          className={`${styles.section} ${styles.declaration} ${styles.sectionHidden} ${declVisible ? styles.sectionVisible : ''}`}
        >
          <span className={styles.sectionNumber}>Phase 06</span>
          <h2 className={styles.sectionTitle}>Declare Your Independence</h2>
          <p className={styles.sectionDescription} style={{ margin: '0 auto' }}>
            Sign your name. Join the movement. Become part of something bigger
            than any feed could ever contain.
          </p>

          <div className={styles.declarationPaper}>
            <div className={styles.declarationText}>
              I, the undersigned, hereby declare my{' '}
              <span className={styles.declarationHighlight}>independence from algorithmic control</span>.
              I refuse to let automated systems dictate what I see, what I think,
              or how I spend my finite time on this earth.
              <br /><br />
              I commit to{' '}
              <span className={styles.declarationHighlight}>reclaiming my attention</span>,{' '}
              <span className={styles.declarationHighlight}>choosing my own inputs</span>, and{' '}
              <span className={styles.declarationHighlight}>building genuine human connections</span>{' '}
              outside the walled gardens of Big Tech.
              <br /><br />
              I understand that escaping is not a one-time act but a daily practice.
              I sign this not as an end, but as a beginning.
            </div>

            <div className={styles.signatureArea}>
              <label className={styles.signatureLabel} htmlFor="signature">
                Your Name — Your Declaration
              </label>
              <input
                id="signature"
                type="text"
                className={styles.signatureInput}
                placeholder="Sign here..."
                value={sigName}
                onChange={(e) => setSigName(e.target.value)}
                disabled={declared}
              />
              {!declared ? (
                <button
                  className={styles.declareBtn}
                  onClick={handleDeclare}
                  disabled={!sigName.trim()}
                  style={{ opacity: sigName.trim() ? 1 : 0.4 }}
                >
                  Declare Independence
                </button>
              ) : (
                <p style={{ color: '#00ff88', marginTop: '1.5rem', fontWeight: 700, fontSize: '1.1rem' }}>
                  Welcome to the outside, {sigName}.
                </p>
              )}
            </div>

            {/* STAMP */}
            <div
              className={`${styles.stamp} ${declared ? styles.stampVisible : ''}`}
            >
              ESCAPED
            </div>
          </div>
        </section>

        {/* ---------- COUNTER BAR ---------- */}
        <div
          ref={counterRef}
          className={styles.counterBar}
        >
          <div className={styles.counterNumber}>
            <AnimatedCounter
              end={escapeeCount}
              duration={2000}
              active={counterVisible}
            />
          </div>
          <div className={styles.counterLabel}>People Have Escaped So Far</div>
        </div>

        {/* ---------- FOOTER ---------- */}
        <footer className={styles.footer}>
          <div className={styles.footerLogo}>Escape The Algorithm</div>
          <div className={styles.footerText}>
            Built by humans. For humans. No algorithms were consulted in the making of this page.
          </div>
        </footer>
      </div>
    </>
  );
}
