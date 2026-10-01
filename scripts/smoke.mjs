import { createServer } from 'vite'
import { renderToString } from 'react-dom/server'
import { createElement } from 'react'

const sections = [
  ['Home', './src/components/Hero.jsx'],
  ['About', './src/components/About.jsx'],
  ['Journey', './src/components/Timeline.jsx'],
  ['Skills', './src/components/Skills.jsx'],
  ['Approach', './src/components/Approach.jsx'],
  ['Work', './src/components/Projects.jsx'],
  ['Contact', './src/components/Contact.jsx'],
]

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

let failures = 0

for (const [name, path] of sections) {
  try {
    const mod = await server.ssrLoadModule(path)
    const Component = mod.default
    if (typeof Component !== 'function') throw new Error('no default export')
    const html = renderToString(createElement(Component, { onNavigate: () => {} }))
    const length = html.length
    if (length < 200) throw new Error(`suspiciously small render: ${length} chars`)
    console.log(`  PASS  ${name.padEnd(9)} ${length} chars`)
  } catch (err) {
    failures++
    console.log(`  FAIL  ${name.padEnd(9)} ${err.message}`)
  }
}

await server.close()

if (failures > 0) {
  console.error(`\n${failures} section(s) failed to render`)
  process.exit(1)
}
console.log('\nAll sections rendered without runtime errors')
