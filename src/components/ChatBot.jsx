import { useState, useRef, useEffect } from 'react'

const faqs = [
  { keywords: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'salam', 'salut'], a: "Hello! Welcome. Ask me about my projects, my stack, or how to reach me 👋" },
  { keywords: ['who are you', 'who is', 'tell me about', 'about you', 'introduce'], a: "I'm Saim Ishak, a full-stack developer from Sidi Bel Abbès, Algeria. I build native desktop applications and web systems, and I'm targeting product teams in Tokyo." },
  { keywords: ['solo life', 'tauri', 'desktop', 'app'], a: 'Solo Life is an offline-first habit tracker built with Tauri 2, React 19 and TypeScript. It has its own XP and rank progression engine in 509 lines of pure functions, 76 automated test cases, and ships as real NSIS and MSI installers.' },
  { keywords: ['pos', 'shops', 'program', 'محل', 'retail', 'invoice', 'pos system'], a: 'A Python point-of-sale system with SQLite: cash and credit sales, a debt collection ledger, stock control, QR-verified PDF invoices and thermal receipt printing. Packaged as a 59MB standalone Windows executable.' },
  { keywords: ['test', 'testing', 'tests', 'coverage'], a: 'Solo Life has 76 test cases written directly on node:assert/strict with no test framework, including fault injection that simulates storage failure to prove a save error never destroys the previous good save.' },
  { keywords: ['skills', 'what can you', 'technologies', 'stack', 'tech'], a: 'Tauri 2, React 19, TypeScript, Zustand, Tailwind, Vite on the frontend side; Python, PySide6, Flet, SQLite, Rust and PHP on the backend side. Plus GitHub Actions CI/CD and PyInstaller packaging.' },
  { keywords: ['ai', 'machine learning', 'llm', 'rag', 'gpt'], a: "I don't have production AI integration in my current projects. The 'intelligence' in Solo Life is deterministic game arithmetic — XP curves and rank thresholds — not a model. I'm interested in that area but I'd rather not claim it yet." },
  { keywords: ['study', 'university', 'education', 'degree', 'school'], a: "I studied Computer Science at Université Djillali Liabès in Sidi Bel Abbès, Algeria, from 2020 to 2024." },
  { keywords: ['projects', 'project', 'done', 'built', 'portfolio'], a: 'Three: the Solo Life desktop app, a Python retail POS system, and a PHP/MySQL university course platform. Each has an engineering note explaining the architectural trade-offs involved.' },
  { keywords: ['contact', 'email', 'phone', 'reach', 'call', 'hire'], a: 'Email: ishaksaim0@gmail.com · Phone: +213 5 54 67 53 88 · GitHub: github.com/Vostro213 · LinkedIn: linkedin.com/in/ishak-saim-245549369' },
  { keywords: ['languages', 'speak', 'arabic', 'english', 'japanese', 'language', 'japan', 'tokyo'], a: 'Arabic is my native language, I work in English, and I am learning Japanese. I am looking to relocate to Tokyo.' },
  { keywords: ['age', 'how old'], a: 'I am 21 years old.' },
  { keywords: ['location', 'where', 'live', 'algeria', 'based'], a: 'I am based in Sidi Bel Abbès, Algeria.' },
  { keywords: ['salary', 'visa', 'sponsorship', 'relocat', 'internship'], a: 'I am seeking an internship or a role with relocation support for Japan, and I am open to discussing timing and conditions.' },
]

const quickReplies = ['Who are you?', 'Tell me about Solo Life', 'What tests have you written?']

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm Saim's assistant. Ask me about his projects, skills, or how to contact him 👋" },
  ])
  const [input, setInput] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (text) => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { from: 'user', text }])
    setInput('')

    const q = text.toLowerCase()
    const match = faqs.find(f => f.keywords.some(k => q.includes(k)))
    const reply = match?.a || "I don't have an answer for that. Try asking about Solo Life, the POS system, my skills, or how to contact me!"
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: reply }])
    }, 500)
  }

  return (
    <>
      <button className={`chat-toggle ${open ? 'open' : ''}`} onClick={() => setOpen(p => !p)} title="Chat with me">
        <i className={`fas ${open ? 'fa-times' : 'fa-comment-dots'}`}></i>
      </button>

      <div className={`chat-panel ${open ? 'open' : ''}`}>
        <div className="chat-header">
          <i className="fas fa-robot"></i> Ask about Saim
          <span className="chat-dot"></span>
        </div>
        <div className="chat-body">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.from}`}>
              {m.from === 'bot' && <div className="chat-avatar"><i className="fas fa-robot"></i></div>}
              <div className="chat-bubble">{m.text}</div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="chat-quick">
          {quickReplies.map(qr => (
            <button key={qr} className="chat-chip" onClick={() => handleSend(qr)}>{qr}</button>
          ))}
        </div>
        <div className="chat-footer">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend(input)}
            placeholder="Ask something..."
          />
          <button onClick={() => handleSend(input)}><i className="fas fa-paper-plane"></i></button>
        </div>
      </div>
    </>
  )
}
