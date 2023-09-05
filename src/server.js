import fs from 'node:fs/promises'
import http from 'node:http'
import open from 'open'

/** Replaces every instance of {{ property }} in the html string with the matching property in data */
const interpolate = (html, data) => {
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (_match, placeholder) => {
    return data[placeholder] || ''
  })
}

const formatNotes = (notes) => {
  return notes
    .map((note) => {
      return `
      <div class="note">
        <p>${note.content}</p>
        <div class="tags">
          ${note.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    `
    })
    .join('\n')
}

const createServer = (notes) => {
  return http.createServer(async (req, res) => {
    const HTML_PATH = new URL('./template.html', import.meta.url).pathname
    const template = await fs.readFile(HTML_PATH, 'utf-8')
    const html = interpolate(template, { notes: formatNotes(notes) })

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(html)
  })
}

export const start = (notes, port) => {
  const server = createServer(notes)

  const address = `http://127.0.0.1:${port}`

  server.listen(port, () => {
    console.log(`Server running on ${address}`)
    open(address)
  })
}
