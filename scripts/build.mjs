import { cp, mkdir, rm, stat } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const source = resolve(root, 'site')
const output = resolve(root, 'dist')

await stat(resolve(source, 'index.html'))
await rm(output, { recursive: true, force: true })
await mkdir(output, { recursive: true })
await cp(source, output, { recursive: true })

console.log(`Built static portfolio in ${output}`)
