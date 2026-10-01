const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'am', 'was', 'were', 'be', 'been', 'being',
  'do', 'does', 'did', 'have', 'has', 'had', 'i', 'you', 'he', 'she', 'it',
  'we', 'they', 'me', 'my', 'your', 'yourself', 'of', 'to', 'in', 'on', 'for',
  'at', 'by', 'with', 'about', 'can', 'could', 'would', 'should', 'will',
  'shall', 'may', 'might', 'must', 'what', 'who', 'whom', 'which', 'when',
  'where', 'why', 'how', 'and', 'or', 'but', 'if', 'then', 'than', 'so',
  'that', 'this', 'these', 'those', 'there', 'here', 'please', 'thanks',
  'thank', 'hi', 'hey', 'hello', 'tell', 'know', 'want', 'like', 'need',
  'get', 'got', 'any', 'some', 'much', 'more', 'very', 'just', 'also',
])

const SYNONYMS = {
  tech: 'stack', technology: 'stack', technologies: 'stack', tool: 'stack',
  tools: 'stack', skill: 'stack', skills: 'stack', language: 'stack',
  job: 'work', jobs: 'work', role: 'work', roles: 'work', position: 'work',
  opportunity: 'work', opportunities: 'work',
  cv: 'resume', résumé: 'resume', resume: 'resume', curriculum: 'resume',
  repo: 'github', repository: 'github', repositories: 'github', code: 'github',
  test: 'tests', testing: 'tests', tests: 'tests', qa: 'tests',
  app: 'application', apps: 'application', applications: 'application',
  software: 'application', program: 'application', programme: 'application',
  project: 'projects', projects: 'projects', portfolio: 'projects', work: 'projects',
  desktop: 'tauri', native: 'tauri', rust: 'tauri', tauri: 'tauri',
  pos: 'retail', shop: 'retail', shops: 'retail', store: 'retail',
  invoice: 'retail', receipt: 'retail', billing: 'retail',
  react: 'frontend', frontend: 'frontend', ui: 'frontend', web: 'frontend',
  python: 'backend', backend: 'backend', server: 'backend', api: 'backend',
  database: 'sqlite', sql: 'sqlite', sqlite: 'sqlite', db: 'sqlite',
  mail: 'email', email: 'email', phone: 'contact', contact: 'contact',
  call: 'contact', message: 'contact', hire: 'contact', hiring: 'contact',
  recruiter: 'contact', reach: 'contact',
  location: 'where', based: 'where', livein: 'where', lives: 'where',
  living: 'where', country: 'where', city: 'where', whereabouts: 'where',
  hometown: 'where', situated: 'where', resides: 'where',
  old: 'age', years: 'age', experience: 'age', experiencewith: 'age',
  ai: 'ai', ml: 'ai', llm: 'ai', gpt: 'ai', rag: 'ai', machinelearning: 'ai',
  machine: 'ai', chatgpt: 'ai', openai: 'ai', model: 'ai',
  japan: 'where', japanese: 'where', tokyo: 'where', relocate: 'where',
  remote: 'where', onsite: 'where', availability: 'where', available: 'where',
  studying: 'learn', learning: 'learn', learn: 'learn', study: 'learn',
  cert: 'certificates', certificate: 'certificates', certificates: 'certificates',
  uni: 'university', university: 'university', college: 'university',
  school: 'university', degree: 'university', education: 'university',
  bug: 'tests', bugs: 'tests', broken: 'tests', crash: 'tests',
  lang: 'languages', languages: 'languages', speak: 'languages',
  arabic: 'languages', english: 'languages', french: 'languages',
  live: 'demo', demo: 'demo', install: 'demo', installer: 'demo',
  download: 'demo', screenshot: 'demo', video: 'demo',
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function stem(word) {
  if (word.length <= 3) return word
  return word
    .replace(/(ies)$/, 'y')
    .replace(/(sses)$/, 'ss')
    .replace(/(ing|ers|er|ed|es|s)$/, '')
}

function expand(word) {
  const w = stem(word)
  return [w, SYNONYMS[w]].filter(Boolean)
}

function tokens(text) {
  return normalize(text)
    .split(' ')
    .filter(t => t.length > 1 && !STOPWORDS.has(t))
}

function editDistance(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 3
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 0; j <= b.length; j++) dp[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      )
    }
  }
  return dp[a.length][b.length]
}

function similarity(a, b) {
  if (a === b) return 1
  if (Math.abs(a.length - b.length) > 2) return 0
  const d = editDistance(a, b)
  const longest = Math.max(a.length, b.length)
  return longest === 0 ? 0 : 1 - d / longest
}

function bigrams(word) {
  if (word.length < 3) return new Set([word])
  const set = new Set()
  for (let i = 0; i < word.length - 1; i++) set.add(word.slice(i, i + 2))
  return set
}

function containsTerm(queryToken, variants) {
  for (const variant of variants) {
    if (queryToken.includes(variant) && variant.length >= 4) return 0.7
    if (variant.includes(queryToken) && queryToken.length >= 4) return 0.7
  }
  return 0
}

function scorePair(queryToken, entryKeywords) {
  let best = 0
  const queryBigrams = bigrams(queryToken)

  for (const keyword of entryKeywords) {
    for (const keywordToken of keyword.split(' ')) {
      for (const variant of expand(keywordToken)) {
        if (queryToken === variant) {
          best = Math.max(best, 1)
          continue
        }
        if (similarity(queryToken, variant) >= 0.72) {
          best = Math.max(best, 0.75)
          continue
        }
        if (queryToken.startsWith(variant) || variant.startsWith(queryToken)) {
          if (Math.min(queryToken.length, variant.length) >= 4) best = Math.max(best, 0.7)
          continue
        }

        const contained = containsTerm(queryToken, [variant])
        if (contained > 0) {
          best = Math.max(best, contained)
          continue
        }

        const variantBigrams = bigrams(variant)
        let shared = 0
        for (const gram of queryBigrams) if (variantBigrams.has(gram)) shared++
        if (shared >= 2) best = Math.max(best, 0.6)
      }
    }
  }

  return best
}

export function matchEntry(question, entries) {
  const queryTokens = tokens(question)
  if (queryTokens.length === 0) return null

  const expanded = new Set()
  for (const t of queryTokens) {
    for (const v of expand(t)) expanded.add(v)
  }

  let bestEntry = null
  let bestScore = 0

  for (const entry of entries) {
    const keywords = entry.keywords ?? []
    let score = 0
    const matched = new Set()

    for (const queryToken of expanded) {
      const hit = scorePair(queryToken, keywords)
      if (hit > 0) {
        score += hit
        matched.add(queryToken)
      }
    }

    if (score === 0) continue

    const coverage = matched.size / expanded.size
    score = score * 0.6 + coverage * 2.4

    if (score > bestScore) {
      bestScore = score
      bestEntry = entry
    }
  }

  const threshold = 0.85
  if (bestScore < threshold) return null
  return { entry: bestEntry, score: Math.min(bestScore / 2.2, 1) }
}
