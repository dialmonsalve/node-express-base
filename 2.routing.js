const http = require('node:http')

const dittoJSON = require('./')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJSON))
        default:
          res.statusCode = 404
          return res.setHeader('content-Type', 'text/html; charset=utf-8')
      }
    case 'POST':
      switch (url) {
        case '/pokemon':{
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, { 'content-Type': 'application/json; charset=utf-8' })
            res.end(JSON.stringify(data))
          })
        }
          break
        default:
          res.statusCode = 404
          res.setHeader('content-Type', 'text/html; charset=utf-8')
          return res.end('Not found')
      }
  }
}
const server = http.createServer(processRequest)

server.listen(1234, () => {
  console.log('Server listening on port 1234')
})
