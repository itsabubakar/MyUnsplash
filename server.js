require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3000
const connectDB = require('./config/dbConn')

connectDB()

app.use(express.json())

app.use('/api', require('./routes/imgRoutes'))

mongoose.connection.once('open', () => {
    console.log('Connection to database successfull')
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err);
})