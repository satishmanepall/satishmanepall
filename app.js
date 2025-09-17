const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./src/config/database')
const routes = require('./src/routes')

dotenv.config()
connectDB()

const app = express()

app.use(
  cors({
    origin: '*', // Allow all origins, adjust as necessary for security
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    allowedHeaders: 'Accept, Authorization, Content-Type, X-Requested-With, Range',
    exposedHeaders: 'Content-Length',
    credentials: true,
  }),
)

// Parse incoming requests with JSON payloads
app.use(express.json({ limit: '50mb' }))

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '80mb', extended: false }))

// Parse application/json
app.use(bodyParser.json({ limit: '50mb' }))

app.use('/api', routes)

const PORT = process.env.PORT || 3601
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
