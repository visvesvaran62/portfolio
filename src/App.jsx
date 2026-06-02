import { useState, useEffect, useRef } from 'react'
import professional from './assets/profess.png'
import { FaGithub } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";



const NAV = ['Home', 'About', 'Skills', 'Projects', 'Education', 'Contact']

const SKILLS = {
  'Front-End': [
    { name: 'React.js', level: 88 },
    { name: 'JavaScript ES6+', level: 85 },
    { name: 'HTML5 & CSS3', level: 92 },
    { name: 'Tailwind CSS', level: 82 },
    { name: 'Context API', level: 80 },
    { name: 'React Router', level: 82 },
  ],
  'Back-End': [
    { name: 'Node.js', level: 78 },
    { name: 'Express.js', level: 76 },
    { name: 'REST APIs', level: 82 },
    { name: 'CRUD Operations', level: 84 },
  ],
  'Database': [
    { name: 'MongoDB', level: 75 },
    { name: 'MySQL', level: 70 },
  ],
  'Tools': [
    { name: 'Git & GitHub', level: 80 },
    { name: 'Vercel', level: 75 },
    { name: 'Render', level: 72 },
    { name: 'VS Code', level: 90 },
  ],
}

const TAGS = {
  react: { label: 'React.js', color: '#61dafb' },
  context: { label: 'Context API', color: '#7c6cfa' },
  node: { label: 'Node.js', color: '#00e5a0' },
  express: { label: 'Express.js', color: '#aaa' },
  mongo: { label: 'MongoDB', color: '#4DB33D' },
  api: { label: 'REST API', color: '#f59e0b' },
  fetch: { label: 'Fetch API', color: '#63d2ff' },

  nodejs: { label: 'Node.js', color: '#00e5a0' },
  expressjs: { label: 'Express.js', color: '#aaaaaa' },
  mongodb: { label: 'MongoDB', color: '#4DB33D' },
  Geminiai: { label: 'Gemini AI', color: '#ff6b6b' },
}

const PROJECTS = [
  {
    id: 1,
    num: '01',
    title: 'SmartCart',
    subtitle: 'Product Listing App',
    period: 'Dec 2024 – Jan 2025',
    desc: 'A full-featured e-commerce product listing application built with React and Context API. Features real-time filtering, multi-criteria sorting, and a responsive cart system with global state management.',
    tags: ['react', 'context', 'api'],
    highlights: [
      'Product filters & multi-criteria sorting',
      'Global cart state via Context API',
      'Responsive component architecture',
    ],
    accent: '#7c6cfa',
    link: '#',
    github: 'https://github.com/visvesvaran62',
  },
  {
  id: 2,
  num: '02',
  title: 'DevPath AI',
  subtitle: 'AI-Powered Learning Roadmap Platform',
  period: '2025 – Present',
  desc: 'An AI-driven learning platform that generates personalized roadmaps based on user goals and skill levels. Features task tracking, progress analytics, authentication, and an intelligent AI mentor for guided learning and career development.',
tags: ['react', 'nodejs', 'expressjs', 'mongodb', 'Geminiai'],
  highlights: [
    'AI-generated personalized learning roadmaps',
    'Task management & progress tracking dashboard',
    'JWT authentication and secure user management',
    'AI mentor chatbot for learning guidance',
    'Responsive full-stack MERN architecture',
  ],
  accent: '#00C896',
  link: 'https://devpath-omega.vercel.app/',
  github: 'https://github.com/visvesvaran62/devpath-ai',
},
  {
    id: 3,
    num: '03',
    title: 'WeatherNow',
    subtitle: 'Forecast Application',
    period: 'Feb 2024 – Mar 2024',
    desc: 'A weather forecast app powered by OpenWeatherMap API. Delivers real-time weather data with graceful error handling, dynamic loading states, and a UI that updates based on conditions.',
    tags: ['react', 'fetch', 'api'],
    highlights: [
      'OpenWeatherMap API integration',
      'Error handling & loading states',
      'Dynamic condition-based UI',
    ],
    accent: '#63d2ff',
    link: '#',
    github: 'https://github.com/visvesvaran62',
  },
]

const CERTS = [
  { title: 'MERN Stack Development', issuer: 'SLA Institute', period: 'Oct 2025 – May 2026', icon: '◈', color: '#7c6cfa' },
  { title: 'Data Analytics', issuer: 'NOVI Tech, Coimbatore', period: 'Jul 2025 – Sep 2025', icon: '◉', color: '#00e5a0' },
  { title: 'JavaScript Fundamentals', issuer: 'Cognitive Class (IBM)', period: '2024', icon: '◎', color: '#63d2ff' },
]

const EDU = [
  {
    degree: 'Master of Computer Application',
    school: 'NIITM',
    period: 'Jun 2023 – Aug 2025',
    cgpa: '7.52',
    icon: '⬡',
    color: '#63d2ff',
  },
  {
    degree: 'Bachelor of Computer Science',
    school: 'E.G.S. Pillay Arts & Science',
    period: 'Jun 2020 – Mar 2023',
    cgpa: '6.9',
    icon: '⬡',
    color: '#7c6cfa',
  },
]

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hov, setHov] = useState(false)
  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY })
    const over = e => setHov(!!e.target.closest('a,button,.skill-pill,.proj-card'))
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over) }
  }, [])
  return (
    <div
      style={{
        position: 'fixed', left: pos.x, top: pos.y, zIndex: 9999,
        width: hov ? 40 : 16, height: hov ? 40 : 16,
        borderRadius: '50%', pointerEvents: 'none',
        transform: 'translate(-50%,-50%)',
        background: hov ? 'rgba(56, 189, 248, 0.15)' : 'rgba(56, 189, 248, 0.5)',
        border: '1.5px solid rgba(56, 189, 248, 0.7)',
        transition: 'width 0.2s, height 0.2s, background 0.2s',
        mixBlendMode: 'screen',
      }}
    />
  )
}


function Navbar({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 48px',
      height: 68,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(3,7,18,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(56,189,248,0.1)' : 'none',
      transition: 'all 0.4s ease',
    }}>

      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>
        <span style={{ color: 'var(--accent)' }}>V</span>
        <span style={{ color: 'var(--text)' }}>isvesv</span>
        <span style={{ color: 'var(--accent2)' }}>aran</span>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent3)', fontSize: 20, marginLeft: 4 }}> G</span>
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        {NAV.map(item => (
          <button
            key={item}
            onClick={() => onNav(item)}
            className={`nav-link ${active === item ? 'active' : ''}`}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: 12.5, fontWeight: 400,
              color: active === item ? 'var(--accent)' : 'var(--muted)',
              letterSpacing: '0.05em', textTransform: 'lowercase',
              padding: '4px 0',
            }}
          >
            {item}
          </button>
        ))}
        <a
          href="mailto:visvesvaran62@email.com"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, padding: '8px 20px',
            border: '1px solid var(--accent)', borderRadius: 6, color: 'var(--accent)',
            textDecoration: 'none', letterSpacing: '0.05em',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.target.style.background = 'rgba(56,189,248,0.1)'
            e.target.style.boxShadow = '0 0 20px rgba(56,189,248,0.2)'
          }}
          onMouseLeave={e => {
            e.target.style.background = 'transparent'
            e.target.style.boxShadow = 'none'
          }}
        >hire_me</a>

        <a
  href="https://drive.google.com/file/d/1VFpib-lY2nacr0BUEt0kMcMMdnds30h3/view?usp=drive_link"
  download
  style={{
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    padding: '8px 20px',
    border: '1px solid var(--accent)',
    borderRadius: 6,
    color: 'var(--accent)',
    textDecoration: 'none',
  }}
>
  Resume
</a>
      </div>
    </nav>
  )
}


function Hero({ onNav }) {
  const [typed, setTyped] = useState('')
  const roles = ['MERN Stack Developer', 'React Specialist', 'Full-Stack Engineer', 'API Architect']
  const [rIdx, setRIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = roles[rIdx]
    let timeout
    if (!deleting && typed.length < target.length) {
      timeout = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 75)
    } else if (!deleting && typed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(typed.slice(0, -1)), 40)
    } else if (deleting && typed.length === 0) {
      setDeleting(false)
      setRIdx(i => (i + 1) % roles.length)
    }
    return () => clearTimeout(timeout)
  }, [typed, deleting, rIdx])

  return (
    <section id="Home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 68 }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
      <div className="orb animate-glow" style={{ width: 600, height: 600, background: 'rgba(37,99,235,0.15)', top: -100, right: -100, animationDelay: '0s' }} />
      <div className="orb animate-glow" style={{ width: 400, height: 400, background: 'rgba(56,189,248,0.1)', bottom: 50, left: -80, animationDelay: '1.5s' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div className="animate-fade-up" style={{ marginBottom: 24 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', padding: '6px 16px', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 99, background: 'rgba(56,189,248,0.05)' }}>Available for new projects</span>
            </div>
            <h1 className="animate-fade-up delay-100" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(48px, 6vw, 78px)', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 20, color: 'var(--text)' }}>
              Visvesvaran<br /><span className="grad-text" />
            </h1>
            <div className="animate-fade-up delay-200" style={{ marginBottom: 32, height: 40, display: 'flex', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: 'var(--accent)', fontWeight: 500 }}>
                &gt; {typed}<span className="animate-blink" style={{ borderLeft: '3px solid var(--accent)', marginLeft: 4 }}>&nbsp;</span>
              </span>
            </div>
            <p className="animate-fade-up delay-300" style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.8, maxWidth: 520, marginBottom: 48 }}>
              Passionate MERN Stack Developer specializing in creating dynamic, scalable, and high-performance web applications. Experienced in building responsive frontend interfaces and efficient backend APIs with modern web technologies.
            </p>
            <div className="animate-fade-up delay-400" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <button onClick={() => onNav('Projects')}
                style={{ padding: '16px 36px', borderRadius: 12, background: 'linear-gradient(135deg, var(--accent), var(--accent3))', border: 'none', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 10px 30px rgba(37,99,235,0.3)' }}
                onMouseEnter={e => { e.target.style.transform = 'translateY(-3px) scale(1.02)'; e.target.style.boxShadow = '0 15px 40px rgba(37,99,235,0.5)' }}
                onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 10px 30px rgba(37,99,235,0.3)' }}>
                Explore My Work
              </button>
              <a href="mailto:visvesvaran62@email.com" style={{ padding: '16px 36px', borderRadius: 12, background: 'transparent', border: '2px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, cursor: 'pointer', textDecoration: 'none', transition: 'all 0.3s', display: 'inline-block' }}
                onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.background = 'rgba(56,189,248,0.05)' }}
                onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'transparent' }}>
                Contact Me
              </a>
            </div>
          </div>

          <div className="animate-float" style={{ position: 'relative' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '0.85', borderRadius: '30px', overflow: 'hidden', border: '1px solid rgba(56,189,248,0.2)', boxShadow: '0 40px 100px rgba(0,0,0,0.6)', transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
              onMouseMove={e => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = (e.clientX - rect.left) / rect.width - 0.5
                const y = (e.clientY - rect.top) / rect.height - 0.5
                e.currentTarget.style.transform = 'perspective(1000px) rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 10) + 'deg) scale(1.02)'
              }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)' }}>
              <img src={professional} alt="Visvesvaran G" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg) 0%, transparent 40%)' }} />
            </div>
            <div style={{ position: 'absolute', top: '10%', right: '-10%', padding: '12px 20px', borderRadius: 12 }} className="glass animate-float delay-100"><span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)' }}>MongoDB</span></div>
            <div style={{ position: 'absolute', bottom: '20%', left: '-15%', padding: '12px 20px', borderRadius: 12 }} className="glass animate-float delay-500"><span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)' }}>React.js</span></div>
            <div style={{ position: 'absolute', top: '50%', right: '-15%', padding: '12px 20px', borderRadius: 12 }} className="glass animate-float delay-200"><span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)' }}>Node.js</span></div>
            <div style={{ position: 'absolute', inset: -30, borderRadius: 40, background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)', zIndex: -1, filter: 'blur(40px)' }} />
          </div>
        </div>

        <div className="animate-fade-up delay-600" style={{ marginTop: 100, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
          {[
 { val: '5+', label: 'Projects Built' },
 { val: 'MERN', label: 'Tech Stack' },
 { val: 'MCA', label: 'Graduate' },
 { val: '1+', label: 'Years Learning' },
].map(stat => (
            <div key={stat.label} style={{ background: 'var(--surface)', padding: 32, textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, color: 'var(--accent)', letterSpacing: '-0.04em' }}>{stat.val}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  const [ref, inView] = useInView()
  return (
    <section id="About" ref={ref} style={{ padding: '120px 48px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', width: '100%' }}>
        <h2 className={inView ? 'animate-fade-up' : ''} style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 42, letterSpacing: '-0.03em', marginBottom: 24, lineHeight: 1.1, color: 'var(--text)' }}>
          Building the<br /><span className="grad-text">web that matters</span>
        </h2>
        <p className={inView ? 'animate-fade-up delay-100' : ''} style={{ color: 'var(--muted)', lineHeight: 1.85, marginBottom: 20 }}>
          I'm a passionate MERN Stack Developer with an MCA degree from NIITM, Coimbatore. I build modern, scalable, and high-performance web applications using React, Node.js, Express.js, and MongoDB.
        </p>
        <p className={inView ? 'animate-fade-up delay-200' : ''} style={{ color: 'var(--muted)', lineHeight: 1.85, marginBottom: 36 }}>
          I specialize in building scalable, responsive web applications with clean component-based architecture. Proficient in authentication flows, CRUD systems, REST API design, and MongoDB database management.
        </p>
        <div className={inView ? 'animate-fade-up delay-300' : ''} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'Location', val: 'Chennai, Tamil Nadu, India' },
            { label: 'Email', val: 'visvesvaran62@email.com' },
            { label: 'Phone', val: '+91 7708402766' },
            { label: 'Status', val: 'Open to opportunities' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--accent)', minWidth: 80, letterSpacing: '0.05em' }}>{item.label}</span>
              <span style={{ color: 'var(--border)', fontSize: 12 }}>-</span>
              <span style={{ fontSize: 14, color: 'var(--text)' }}>{item.val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const [ref, inView] = useInView()
  const allTags = ['React.js','Node.js','Express.js','MongoDB','JavaScript','HTML5','CSS3','Tailwind CSS','Context API','React Router','REST APIs','Git','Vercel','Render','MySQL']

  return (
    <section id="Skills" ref={ref} style={{ padding: '120px 0', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 42, letterSpacing: '-0.03em', color: 'var(--text)' }}>
            Skills & <span className="grad-text">Expertise</span>
          </h2>
        </div>

       
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 60 }}>
          {Object.entries(SKILLS).map(([cat, items], ci) => (
            <div key={cat} className={`glass ${inView ? `animate-fade-up delay-${ci * 100 + 100}` : ''}`}
              style={{ padding: '28px 32px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: 20, textTransform: 'uppercase' }}>
                {cat}
              </div>
              {items.map((s, i) => (
                <div key={s.name} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13.5, color: 'var(--text)' }}>{s.name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>{s.level}%</span>
                  </div>
                  <div style={{ height: 2, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
                    {inView && (
                      <div className="progress-fill"
                        style={{ width: `${s.level}%`, animationDelay: `${(ci * 4 + i) * 0.06 + 0.3}s` }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        
        <div style={{ overflow: 'hidden', position: 'relative', padding: '20px 0' }}>
          <div style={{ display: 'flex', gap: 12, width: 'max-content' }} className="animate-marquee">
            {[...allTags, ...allTags].map((t, i) => (
              <span key={i} className="skill-pill" style={{
                fontFamily: 'var(--font-mono)', fontSize: 12, padding: '8px 18px',
                border: '1px solid var(--border)', borderRadius: 6,
                color: 'var(--muted)', whiteSpace: 'nowrap',
                background: 'rgba(255,255,255,0.02)',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const [ref, inView] = useInView()
  return (
    <section id="Projects" ref={ref} style={{ padding: '120px 48px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 64 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 42, letterSpacing: '-0.03em', color: 'var(--text)' }}>
          Featured <span className="grad-text">Projects</span>
        </h2>
      </div>


      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {PROJECTS.map((p, i) => (
          <div key={p.id}
            className={`proj-card glass ${inView ? `animate-fade-up delay-${i * 200 + 100}` : ''}`}
            style={{ padding: '40px 44px', position: 'relative', overflow: 'hidden' }}
          >
            
            <div style={{
              position: 'absolute', right: 32, top: 24,
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 80, color: 'rgba(255,255,255,0.025)', letterSpacing: '-0.05em',
              userSelect: 'none', lineHeight: 1,
            }}>{p.num}</div>

           
            <div style={{ position: 'absolute', left: 0, top: 40, bottom: 40, width: 3, background: p.accent, borderRadius: '0 2px 2px 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em' }}>{p.period}</span>
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 4 }}>{p.title}</h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: p.accent, letterSpacing: '0.05em', marginBottom: 16 }}>{p.subtitle}</div>
                <p style={{ color: 'var(--muted)', lineHeight: 1.8, maxWidth: 580, marginBottom: 24, fontSize: 14.5 }}>{p.desc}</p>

                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                  {p.highlights.map(h => (
                    <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: p.accent, flexShrink: 0 }} />
                      <span style={{ fontSize: 13.5, color: 'var(--text)' }}>{h}</span>
                    </div>
                  ))}
                </div>

               
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {p.tags.map(t => {
                    const tag = TAGS[t]
                    return (
                      <span key={t} style={{
                        fontFamily: 'var(--font-mono)', fontSize: 11.5,
                        padding: '5px 14px', borderRadius: 4,
                        border: `1px solid ${tag.color}30`,
                        background: `${tag.color}08`,
                        color: tag.color, letterSpacing: '0.05em',
                      }}>{tag.label}</span>
                    )
                  })}
                </div>
              </div>

     <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'flex-start', paddingTop: 44 }}>

  {/* Live Demo Button */}
<a
  href={p.link}
  target="_blank"
  rel="noopener noreferrer"
  style={{
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    padding: '10px 20px',
    border: '1px solid var(--accent)',
    borderRadius: 8,
    color: 'var(--accent)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
  }}
  onMouseEnter={e => {
    e.currentTarget.style.background = 'rgba(56,189,248,0.1)';
    e.currentTarget.style.color = 'var(--accent)';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.background = 'transparent';
    e.currentTarget.style.color = 'var(--accent)';
  }}
>
  <FaExternalLinkAlt size={12} />
  Live Demo
</a>

  {/* GitHub Button */}
 <a
  href={p.github}
  target="_blank"
  rel="noopener noreferrer"
  style={{
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    padding: '10px 20px',
    border: '1px solid var(--border)',
    borderRadius: 8,
    color: 'var(--muted)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
  }}
  onMouseEnter={e => {
    e.currentTarget.style.borderColor = 'var(--accent)';
    e.currentTarget.style.color = 'var(--accent)';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.borderColor = 'var(--border)';
    e.currentTarget.style.color = 'var(--muted)';
  }}
>
  <FaGithub size={14} />
  GitHub
</a>

</div>

            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Education() {
  const [ref, inView] = useInView()
  return (
    <section id="Education" ref={ref} style={{ padding: '120px 48px', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 42, letterSpacing: '-0.03em', color: 'var(--text)' }}>
            Academic <span className="grad-text">Background</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: 28, textTransform: 'uppercase' }}>Degrees</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {EDU.map((e, i) => (
                <div key={e.degree} className={`glass ${inView ? `animate-fade-up delay-${i * 200 + 100}` : ''}`}
                  style={{ padding: '28px 32px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${e.color}, transparent)` }} />
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 26, color: e.color, marginBottom: 12 }}>{e.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--text)', marginBottom: 6, letterSpacing: '-0.01em' }}>{e.degree}</h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: e.color, marginBottom: 4 }}>{e.school}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                    <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>{e.period}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 12, padding: '4px 12px',
                      background: `${e.color}15`, border: `1px solid ${e.color}30`,
                      borderRadius: 4, color: e.color,
                    }}>CGPA {e.cgpa}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent2)', letterSpacing: '0.12em', marginBottom: 28, textTransform: 'uppercase' }}>Certifications</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {CERTS.map((c, i) => (
                <div key={c.title} className={`glass ${inView ? `animate-fade-up delay-${i * 150 + 200}` : ''}`}
                  style={{ padding: '24px 28px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                    background: `${c.color}15`, border: `1px solid ${c.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, color: c.color,
                  }}>{c.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 4 }}>{c.title}</h4>
                    <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>{c.issuer}</div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: c.color }}>{c.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [ref, inView] = useInView()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: '', email: '', message: '' })
  }

  const inputStyle = (focused) => ({
    width: '100%', padding: '14px 18px',
    background: 'var(--surface2)', border: `1px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
    borderRadius: 8, color: 'var(--text)',
    fontFamily: 'var(--font-body)', fontSize: 14.5,
    outline: 'none', transition: 'border-color 0.2s',

  })

  return (
    <section id="Contact" ref={ref} style={{ padding: '120px 48px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
        
        <div className={inView ? 'animate-fade-up' : ''}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 42, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 24, lineHeight: 1.1 }}>
            Let's build<br /><span className="grad-text">something great</span>
          </h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.85, marginBottom: 40, fontSize: 15 }}>
            I'm actively looking for full-stack, front-end, or MERN developer roles. 
            Whether you have a project in mind, a position open, or just want to connect — 
            I'd love to hear from you.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '📧', label: 'Email', val: 'visvesvaran62@email.com', href: 'mailto:visvesvaran62@email.com' },
              { icon: '📞', label: 'Phone', val: '+91 7708402766', href: 'tel:+917708402766' },
              { icon: '📍', label: 'Location', val: 'Chennai, Tamil Nadu', href: null },
            ].map(item => (
              <div key={item.label} className="glass" style={{ padding: '18px 22px', display: 'flex', gap: 16, alignItems: 'center' }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em', marginBottom: 2 }}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} style={{ fontSize: 14, color: 'var(--accent)', textDecoration: 'none' }}
                      onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                      onMouseLeave={e => e.target.style.textDecoration = 'none'}
                    >{item.val}</a>
                  ) : (
                    <span style={{ fontSize: 14, color: 'var(--text)' }}>{item.val}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`glass-accent ${inView ? 'animate-fade-up delay-200' : ''}`} style={{ padding: '40px 44px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--text)', marginBottom: 28 }}>Send a Message</div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--muted)', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>name</label>
              <input type="text" placeholder="Your Name" value={form.name}
                onChange={e => setForm(p => ({...p, name: e.target.value}))}
                style={inputStyle(false)}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--muted)', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>email</label>
              <input type="email" placeholder="your@email.com" value={form.email}
                onChange={e => setForm(p => ({...p, email: e.target.value}))}
                style={inputStyle(false)}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--muted)', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>message</label>
              <textarea placeholder="Tell me about the opportunity or project..." value={form.message}
                onChange={e => setForm(p => ({...p, message: e.target.value}))}
                rows={5} style={{ ...inputStyle(false), resize: 'none' }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <button type="submit" style={{
              padding: '15px 32px', borderRadius: 8,
              background: sent ? 'rgba(0,229,160,0.15)' : 'linear-gradient(135deg, var(--accent2), var(--accent))',
              border: sent ? '1px solid rgba(0,229,160,0.4)' : 'none',
              color: sent ? 'var(--accent3)' : '#080b10',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15,
              cursor: 'pointer', transition: 'all 0.3s',
              boxShadow: sent ? 'none' : '0 8px 24px rgba(99,210,255,0.2)',
            }}>
              {sent ? '✓ Message Sent!' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '64px 48px',
      background: 'var(--bg)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Connect</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 28, flexWrap: 'wrap' }}>
              {[
                { label: 'GitHub', href: 'https://github.com/visvesvaran62' },
                { label: 'LinkedIn', href: 'http://www.linkedin.com/in/visvesvaran-g-59a5313b9' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                >{s.label}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>
            © 2026 Visvesvaran G · Built with ❤️ & React
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
             <span style={{ fontSize: 12, color: 'var(--muted)' }}>Chennai, India</span>
             <span style={{ fontSize: 12, color: 'var(--muted)' }}>visvesvaran62@email.com</span>
          </div>
        </div>
      </div>
    </footer>
  )
}



export default function App() {
  const [activeTab, setActiveTab] = useState('Home')

  const scrollToSection = (section) => {
    setActiveTab(section)
    const el = document.getElementById(section)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  
  useEffect(() => {
    const observers = NAV.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setActiveTab(id)
      }, { threshold: 0.4 })
      obs.observe(el)
      return obs
    }).filter(Boolean)
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Cursor />
      <Navbar active={activeTab} onNav={scrollToSection} />
      <Hero onNav={scrollToSection} />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  )
}
