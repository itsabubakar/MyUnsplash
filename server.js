require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const connectDB = require('./config/dbConn')

connectDB()

app.use(express.json())
app.use(cors())

app.use('/api', require('./routes/imgRoutes'))
app.use('/api/search', require('./routes/searchRoute'))
app.use('/api/test', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

// * Serve static assets in production, must be at this location of this file

app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'client', 'dist')))
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
})


mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
    console.log('Connection to database successfull')
})

mongoose.connection.on('error', err => {
    console.log(err);
})