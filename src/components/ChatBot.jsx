import { useState, useRef, useEffect } from 'react'
import { matchEntry } from '../lib/chatEngine'

const knowledge = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'salam', 'salut', 'bonjour', 'good morning', 'good evening'],
    a: "Hello! I'm Saim's assistant. Ask me about his projects, his stack, his testing approach, or how to reach him 👋",
    suggestions: ['Tell me about Solo Life', 'What tests has he written?', 'How to contact him?'],
  },
  {
    keywords: ['who', 'introduce', 'about', 'yourself', 'saim', 'bio', 'summary'],
    a: "I'm Saim Ishak, a full-stack developer from Sidi Bel Abbès, Algeria. I build native desktop applications and web systems, and I'm open to remote work or relocation for the right role.",
    suggestions: ['Show me the projects', 'What is his stack?', 'Where is he based?'],
  },
  {
    keywords: ['solo life', 'tauri', 'desktop', 'native', 'app', 'application', 'habit', 'tracker', 'rpg', 'xp', 'game'],
    a: 'Solo Life is an offline-first habit tracker built with Tauri 2, React 19 and TypeScript. Its XP and rank progression engine is 509 lines of pure functions with no React imports, so the whole ruleset is testable in plain Node. It ships as real NSIS and MSI installers, needs no network at all, and locks down its Content Security Policy.',
    suggestions: ['How many tests cover it?', 'Why did he reject SQLite?', 'What else has he built?'],
  },
  {
    keywords: ['pos', 'retail', 'shop', 'store', 'invoice', 'receipt', 'thermal', 'cashier', 'sales', 'debt', 'credit', 'ledger', 'stock', 'inventory', 'sqlite', 'python', 'pyside', 'flet', 'pyinstaller'],
    a: 'A Python point-of-sale system built for the Algerian market, written right-to-left in Arabic. It covers the product catalogue, cash and credit sales, a debt collection ledger, stock control and profit reporting. Its 690-line data layer has 38 functions and zero UI imports. It generates QR-verified A4 invoices and prints thermal receipts through raw ESC/POS commands over ctypes. Packaged as a 59MB standalone executable.',
    suggestions: ['How is the database designed?', 'Why snapshot the purchase cost?', 'What else has he built?'],
  },
  {
    keywords: ['tests', 'testing', 'test', 'coverage', 'qa', 'assert', 'verify', 'bug', 'bugs', 'crash', 'broken', 'quality'],
    a: 'Solo Life has 76 test cases written directly on node:assert/strict — no Jest, no Vitest, no test framework at all. The runner executes TypeScript directly in Node through a custom resolver hook, so the full suite finishes in under a second and adds nothing to the shipped bundle. The persistence tests inject a storage driver that fails on demand, proving a save error surfaces in the UI without destroying the previous good save.',
    suggestions: ['What about his own website?', 'Show me the projects'],
  },
  {
    keywords: ['stack', 'skills', 'technologies', 'technology', 'tools', 'languages', 'framework', 'expertise', 'proficient', 'knows', 'uses'],
    a: 'Frontend: React 19, TypeScript, Zustand, Tailwind CSS v4, Vite 8, plus hand-written SVG charts with no chart library. Backend and desktop: Python 3.14, PySide6, Flet, SQLite, Tauri 2, Rust, PHP and MySQL. Engineering: automated testing, fault injection, CI/CD with GitHub Actions, and PyInstaller packaging.',
    suggestions: ['Which project is the strongest?', 'How do you contact him?'],
  },
  {
    keywords: ['architecture', 'design', 'structure', 'pattern', 'decisions', 'trade', 'tradeoff', 'trade-off', 'why', 'rationale', 'principle', 'approach', 'philosophy'],
    a: 'His rule is that logic stays out of the view layer. The POS data module imports no UI library; the Solo Life rules engine imports no React. He also documents the options he rejected — why SQLite was skipped in the desktop app, why cloud sync was refused on privacy grounds — and lists known defects instead of hiding them.',
    suggestions: ['What tests has he written?', 'Show me the projects'],
  },
  {
    keywords: ['architecture diagram', 'diagram', 'chart', 'flow', 'schema', 'model', 'database design', 'tables', 'migration', 'normalisation', 'normalization'],
    a: 'The POS database has five tables: products, sales, sale_items, credit and credit_payments. Sale lines carry both a price and a purchase-cost snapshot, which is what keeps historical profit reports correct after prices change. Stock is decremented with a guarded UPDATE plus a row-count check, so a sale can never drive inventory negative.',
    suggestions: ['Tell me about the POS system', 'What else has he built?'],
  },
  {
    keywords: ['php', 'university', 'course', 'college', 'web', 'mail', 'phpmailer', 'mysql', 'login', 'auth', 'authentication', 'third'],
    a: 'The University Course Platform is his first full-stack web project: PHP and MySQL behind a course catalogue, with PHPMailer email confirmation, user profiles with image upload, login and logout, and a course search with feature filtering. It ships through the same GitHub Actions pipeline that publishes this portfolio.',
    suggestions: ['Show me the projects', 'What is his stack?'],
  },
  {
    keywords: ['ai', 'ml', 'machine learning', 'llm', 'gpt', 'openai', 'chatgpt', 'rag', 'retrieval', 'vector', 'neural', 'model', 'prompt'],
    a: "Honestly: no production AI integration in his current projects. The 'intelligence' in Solo Life is deterministic game arithmetic — XP curves and rank thresholds — not a model. He prefers to say that plainly rather than overstate it. I'm his rule-based assistant, not a language model: I match your question against a curated knowledge base, so I can only answer what's written here.",
    suggestions: ['What tests has he written?', 'Show me the projects'],
  },
  {
    keywords: ['devops', 'ci', 'cd', 'cicd', 'pipeline', 'actions', 'github actions', 'deploy', 'deployment', 'pages', 'hosting', 'docker', 'container', 'kubernetes', 'cloud'],
    a: 'Every push to his portfolio repository runs lint, a server-side render smoke test, and a production build on GitHub Actions, then publishes to GitHub Pages. This is the same pipeline discipline the course platform shipped with. He has not containerised these projects yet.',
    suggestions: ['What tests has he written?', 'What is his stack?'],
  },
  {
    keywords: ['education', 'study', 'studied', 'university degree', 'degree', 'school', 'graduate', 'academic', 'certificates', 'certification', 'certified'],
    a: 'He studied Computer Science at Université Djillali Liabès in Sidi Bel Abbès, Algeria, from 2020 to 2024. Certificates cover HTML and CSS fundamentals, JavaScript essentials, React basics, Python and desktop development, cybersecurity principles, and UI/UX design.',
    suggestions: ['What else do you know about him?'],
  },
  {
    keywords: ['contact', 'email', 'mail', 'phone', 'call', 'reach', 'message', 'hire', 'available', 'availability', 'cv', 'resume', 'linkedin', 'social'],
    a: 'Email: ishaksaim0@gmail.com · Phone: +213 5 54 67 53 88 · GitHub: github.com/Vostro213 · LinkedIn: linkedin.com/in/ishak-saim-245549369. He is open to remote work and open to relocating for the right opportunity.',
    suggestions: ['Show me the projects', 'What is his stack?'],
  },
  {
    keywords: ['language', 'languages', 'speak', 'spoken', 'english', 'arabic', 'french', 'communicate'],
    a: 'Arabic is his native language, he works professionally in English, and he also speaks French.',
    suggestions: ['Where is he based?', 'Contact him'],
  },
  {
    keywords: ['location', 'where', 'based', 'live', 'living', 'city', 'country', 'from', 'relocation', 'relocate', 'remote', 'onsite', 'on-site', 'visa', 'sponsorship'],
    a: 'He is based in Sidi Bel Abbès, Algeria, and is open to remote work as well as relocating for the right opportunity.',
    suggestions: ['Contact him', 'What else do you know about him?'],
  },
  {
    keywords: ['age', 'old', 'years', 'experience', 'how long', 'senior', 'junior', 'level'],
    a: 'He is 21, with roughly two years of hands-on building across web, desktop and business software.',
    suggestions: ['Show me the projects', 'What is his stack?'],
  },
  {
    keywords: ['experience', 'work history', 'employment', 'previous', 'companies', 'clients', 'worked', 'background'],
    a: 'His work so far is project-based: the Solo Life desktop app, the Python retail POS system, and the PHP/MySQL university course platform. Each was designed, built and shipped end to end by him, including packaging and deployment.',
    suggestions: ['Show me the projects', 'How does he build?'],
  },
  {
    keywords: ['best', 'strongest', 'favorite', 'proud', 'favourite', 'highlight', 'recommend', 'impressive'],
    a: "He'd probably say Solo Life. It's the most complete piece of engineering: a native desktop app with its own test harness, a strict content security policy, self-hosted fonts, save-corruption recovery, and 4037 lines of Arabic technical documentation — including a self-audit section listing the bugs he knows about and hasn't fixed yet.",
    suggestions: ['Tell me about the POS system', 'How do you contact him?'],
  },
  {
    keywords: ['demo', 'live demo', 'screenshot', 'video', 'install', 'installer', 'download', 'try', 'source', 'repository', 'repo', 'github', 'code'],
    a: 'Source repositories are private for now, pending cleanup of unused files and generated artifacts. Screenshots and installers are available on request — the contact form goes straight to his inbox.',
    suggestions: ['How do you contact him?', 'Show me the projects'],
  },
]

const fallback = {
  a: "I don't have an answer for that one. I match your question against a curated knowledge base, so I can only speak to what's written here. Try asking about Solo Life, the POS system, his stack, his testing, or how to contact him.",
  suggestions: ['Tell me about Solo Life', 'What tests has he written?', 'How do you contact him?'],
}

const opener = {
  from: 'bot',
  text: "Hi! I'm Saim's portfolio assistant — a rule-based matcher, not a language model. Ask me about his projects, his stack, his testing, or how to reach him 👋",
}

const starters = ['Tell me about Solo Life', 'What tests has he written?', 'How do you contact him?']

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([opener])
  const [suggestions, setSuggestions] = useState(starters)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)
  const inputRef = useRef(null)
  const timers = useRef([])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const reply = (text) => {
    const result = matchEntry(text, knowledge)
    const answer = result ? result.entry.a : fallback.a
    setSuggestions(result ? result.entry.suggestions : fallback.suggestions)
    return answer
  }

  const handleSend = (raw) => {
    const text = raw.trim()
    if (!text || typing) return

    setMessages(prev => [...prev, { from: 'user', text }])
    setInput('')
    setTyping(true)

    const answer = reply(text)
    const delay = Math.min(400 + answer.length * 6, 1400)
    const t = setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { from: 'bot', text: answer }])
    }, delay)
    timers.current.push(t)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend(input)
    }
  }

  return (
    <>
      <button
        className={`chat-toggle ${open ? 'open' : ''}`}
        onClick={() => {
          setOpen(p => {
            if (!p) setTimeout(() => inputRef.current?.focus(), 260)
            return !p
          })
        }}
        title="Chat with me"
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
      >
        <i className={`fas ${open ? 'fa-times' : 'fa-comment-dots'}`}></i>
      </button>

      <div className={`chat-panel ${open ? 'open' : ''}`} role="dialog" aria-label="Portfolio assistant">
        <div className="chat-header">
          <i className="fas fa-robot"></i> Ask about Saim
          <span className="chat-dot" title="Online"></span>
        </div>

        <div className="chat-body">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.from}`}>
              {m.from === 'bot' && <div className="chat-avatar"><i className="fas fa-robot"></i></div>}
              <div className="chat-bubble">{m.text}</div>
            </div>
          ))}

          {typing && (
            <div className="chat-msg bot">
              <div className="chat-avatar"><i className="fas fa-robot"></i></div>
              <div className="chat-bubble chat-typing" aria-label="Typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        <div className="chat-quick">
          {suggestions.map(s => (
            <button key={s} className="chat-chip" onClick={() => handleSend(s)} disabled={typing}>
              {s}
            </button>
          ))}
        </div>

        <div className="chat-footer">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something..."
            aria-label="Your question"
            maxLength={200}
          />
          <button onClick={() => handleSend(input)} disabled={typing || !input.trim()} aria-label="Send">
            <i className={`fas ${typing ? 'fa-circle-notch fa-spin' : 'fa-paper-plane'}`}></i>
          </button>
        </div>
      </div>
    </>
  )
}
