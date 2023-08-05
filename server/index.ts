import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import { baseRouter } from './app/routes/indexRouter'
import { env } from './app/helpers/env'
dotenv.config()

const app = express()

const PORT = env('PORT') === '' ? 8080 : env('PORT')

app.use(cors())
app.use(express.json())

app.use('/api/v1', baseRouter)
app.use('*', (req, res) => {
  res.status(404).send({ message: `The path ${req.url} does not exist` })
})

mongoose.connect(env('DB_URL')).then(() => {
  console.log('Before connection')
  console.log('===================== DATABASE CONNECTED ===============')
  app.listen(PORT, () => {
    console.log(`Application started on port ${PORT}`)
  })
  console.log('After connection')
}).catch((error) => {
  console.log('===================== DATABASE NOT CONNECTED ===============')
  console.log(error.message)
})
