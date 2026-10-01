import assert from 'node:assert/strict'
import { matchEntry } from '../src/lib/chatEngine.js'

const knowledge = [
  { keywords: ['solo life', 'tauri', 'desktop', 'app'], a: 'SOLO_LIFE', suggestions: [] },
  { keywords: ['pos', 'retail', 'shop', 'sqlite', 'python'], a: 'POS', suggestions: [] },
  { keywords: ['tests', 'testing', 'qa'], a: 'TESTS', suggestions: [] },
  { keywords: ['stack', 'skills', 'technologies', 'tools'], a: 'STACK', suggestions: [] },
  { keywords: ['contact', 'email', 'phone', 'hire'], a: 'CONTACT', suggestions: [] },
  { keywords: ['ai', 'llm', 'rag', 'gpt'], a: 'AI', suggestions: [] },
  { keywords: ['location', 'where', 'based', 'relocate'], a: 'WHERE', suggestions: [] },
]

const cases = [
  ['what is solo life', 'SOLO_LIFE'],
  ['tell me about the desktop app', 'SOLO_LIFE'],
  ['tauri', 'SOLO_LIFE'],
  ['Solo Life', 'SOLO_LIFE'],
  ['how many tests did you write', 'TESTS'],
  ['what tests has he written?', 'TESTS'],
  ['testing', 'TESTS'],
  ['tell me about the pos system', 'POS'],
  ['the shop project', 'POS'],
  ['how does the database work', 'POS'],
  ['what is his stack', 'STACK'],
  ['what technologies does he use', 'STACK'],
  ['skills', 'STACK'],
  ['how do i contact him', 'CONTACT'],
  ['his email', 'CONTACT'],
  ['do you use ai', 'AI'],
  ['is there any llm integration', 'AI'],
  ['rag', 'AI'],
  ['where is he based', 'WHERE'],
  ['what country', 'WHERE'],
  ['sollolif', 'SOLO_LIFE'],
  ['taurii', 'SOLO_LIFE'],
  ['pos system', 'POS'],
]

let passed = 0
let failed = 0

for (const [question, expected] of cases) {
  const result = matchEntry(question, knowledge)
  const actual = result ? result.entry.a : null
  if (actual === expected) {
    passed++
    console.log(`  PASS  ${question.padEnd(34)} -> ${actual}`)
  } else {
    failed++
    console.log(`  FAIL  ${question.padEnd(34)} -> ${actual ?? 'no match'} (expected ${expected})`)
  }
}

console.log('\n--- should NOT match ---')
const unknown = ['what is the weather', 'banana', 'asdfghjkl', 'who won the world cup']
for (const question of unknown) {
  const result = matchEntry(question, knowledge)
  if (result === null) {
    passed++
    console.log(`  PASS  ${question.padEnd(34)} -> no match (correct)`)
  } else {
    failed++
    console.log(`  FAIL  ${question.padEnd(34)} -> wrongly matched ${result.entry.a}`)
  }
}

console.log(`\n${passed} passed, ${failed} failed`)
assert.equal(failed, 0, `${failed} chat engine test(s) failed`)
