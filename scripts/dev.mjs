import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, normalize, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..', 'site')
const port = Number(process.env.PORT || 3000)
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
  const relativePath = pathname === '/' ? 'index.html' : normalize(pathname).replace(/^[/\\]+/, '')
  const filePath = resolve(root, relativePath)

  if (!filePath.startsWith(root)) {
    response.writeHead(403).end('Forbidden')
    return
  }

  try {
    const details = await stat(filePath)
    if (!details.isFile()) throw new Error('Not a file')
    response.writeHead(200, { 'Content-Type': types[extname(filePath)] || 'application/octet-stream' })
    createReadStream(filePath).pipe(response)
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found')
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Portfolio preview: http://127.0.0.1:${port}`)
})
