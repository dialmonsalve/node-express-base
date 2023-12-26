const http = require('node:http')

const desirePort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  if (req.url === '/') {
    res.setHeader('content-type', 'text/plain; charset=utf-8')
    res.end('Bienvenido a mi página de inicio')
    console.log('Request received', req.url)
  } else if (req.url === '/contacto') {
    res.end('Contacto')
  } else {
    res.statusCode = 404
    res.end('404')
  }
}

const server = http.createServer(processRequest)

server.listen(desirePort, () => {
  console.log(`Server listening on port ${desirePort}`)
})
