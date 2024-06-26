import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import router from './views/routes.js'

dotenv.config();


// express app instance
const app = express()
const port = process.env.PORT || 4000


// middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable set cookie
}));

app.use(express.json());

// routes
app.use('/api', router);


// connect to db
mongoose.connect(process.env.MONGO_URL as string)
  .then(() => {
    app.listen(port, () => {
      console.log(`connected to db & listeneing on port ${port}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
