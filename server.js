require('dotenv').config()
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
app.use('/api/test', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})


mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
    console.log('Connection to database successfull')
})

mongoose.connection.on('error', err => {
    console.log(err);
})