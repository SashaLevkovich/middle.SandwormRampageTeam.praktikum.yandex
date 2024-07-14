import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
// @ts-ignore
import xss from 'xss-clean'

dotenv.config()

import express from 'express'
import routes from './routes'
import { dbConnect } from './db'

const app = express()

app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

dbConnect()

app.use(xss())
app.use(bodyParser.json())
app.use('/api', routes)

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
