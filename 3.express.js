const express = require('express')

const PORT = process.env.PORT ?? 1234
const app = express()
app.disable('x-powered-by')

app.use((req, res, next) => {
  console.log('Middleware')
  next()
})

app.get('/', (req, res) => {
  res.status(200).send('<h1>Mi página</h1>')
})

app.post('/pokemon', (req, res) => {
  let body = ''
  req.on('data', chunk => {
    body += chunk.toString()
  })
  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    res.status(201).json(data)
  })
})

app.use((req, res) => {
  res.status(404).send('<h1>404 not found</h1>')
})

app.listen(PORT, () => {
  console.log('Server listening on port 1234')
})
