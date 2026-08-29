import { useState, useRef, useEffect } from 'react'

const faqs = [
  { keywords: ['hi', 'hello', 'hey', 'good morning', 'good evening'], a: 'Hello! Welcome to my portfolio. Ask me anything about Saim Ishak! 👋' },
  { keywords: ['how are you', 'how are you doing', 'what\'s up', 'sup'], a: "I'm doing great! Thanks for asking. Feel free to ask me about Saim's skills, projects, or how to get in touch 😊" },
  { keywords: ['who are you', 'who is', 'tell me about'], a: "I'm Saim Ishak, a 21-year-old Web Developer from Algeria. I build modern, responsive websites with React, PHP, and more." },
  { keywords: ['skills', 'what can you', 'technologies', 'stack'], a: 'HTML5, CSS3, JavaScript, React, PHP, MySQL, Git, and Cybersecurity.' },
  { keywords: ['study', 'university', 'education', 'degree'], a: "Université Djillali Liabès in Sidi Bel Abbès, Algeria. I have a Degree in Computer Science." },
  { keywords: ['projects', 'project', 'done', 'built'], a: 'University study websites - full-stack projects with PHP, MySQL, HTML, CSS, and JavaScript, including user profiles, sign-up pages, and course search.' },
  { keywords: ['contact', 'email', 'phone', 'reach', 'call'], a: 'Email: ishaksaim0@gmail.com | Phone: +213 5 54 67 53 88 | Based in Sidi Bel Abbès, Algeria.' },
  { keywords: ['languages', 'speak', 'arabic', 'english', 'japanese'], a: 'Arabic (native), English, and Japanese.' },
  { keywords: ['age', 'how old'], a: 'I am 21 years old.' },
  { keywords: ['location', 'where', 'live', 'algeria'], a: 'Sidi Bel Abbès, Algeria.' },
]

const quickReplies = ['Who are you?', 'What are your skills?', 'How to contact you?']

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Ask me anything about Saim Ishak 👋' },
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

    const match = faqs.find(f => f.keywords.some(k => text.toLowerCase().includes(k)))
    const reply = match?.a || "I don't have an answer for that. Try asking about who I am, my skills, or how to contact me!"
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
          <i className="fas fa-robot"></i> Ask about me
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
          {quickReplies.map((qr, i) => (
            <button key={i} className="chat-chip" onClick={() => handleSend(qr)}>{qr}</button>
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
