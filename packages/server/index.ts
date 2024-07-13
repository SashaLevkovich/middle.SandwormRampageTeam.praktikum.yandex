import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import { dbConnect } from './db'

const app = express()

app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

dbConnect()

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
