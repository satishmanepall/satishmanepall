const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http'); // REQUIRED for WebSocket
const connectDB = require('./src/config/database');
const routes = require('./src/routes');
const { init } = require('./src/controllers/socket'); // Socket.IO initializer

dotenv.config();
connectDB();

const app = express();

// Create HTTP server (IMPORTANT)
const server = http.createServer(app);

// Initialize Socket.IO
init(server); // Attach socket.io to server

// Middleware
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Accept, Authorization, Content-Type, X-Requested-With, Range',
    exposedHeaders: 'Content-Length',
    credentials: true,
  })
);

// Parse JSON
app.use(express.json({ limit: '50mb' }));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '80mb', extended: false }));

// Parse application/json
app.use(bodyParser.json({ limit: '50mb' }));

// Register API Routes
app.use('/api', routes);

// Start server (NOT app.listen)
const PORT = process.env.PORT || 3601;

server.listen(PORT, () => {
  console.log(`Server with Socket.IO running on port ${PORT}`);
});
