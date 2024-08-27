import express from 'express'
import * as Path from 'node:path'

import cardRoutes from './routes/cards.ts'
import memoirRoutes from './routes/memoirs.ts'
import habitRoutes from './routes/habits.ts'
import themeRoutes from './routes/themes.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/cards', cardRoutes)
server.use('/api/v1/memoirs', memoirRoutes)
server.use('/api/v1/habits', habitRoutes)
server.use('/api/v1/themes', themeRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
