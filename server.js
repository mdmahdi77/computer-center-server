const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()



// routes
const postRoutes = require('./routes/postRoutes.js')
const authRoutes = require('./routes/authRoutes')
const orderRoutes = require('./routes/orderRoutes')

// app
const app = express()

//db connect
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
.then(() => console.log('DB connect'))
.catch(err => console.log(err))


// middleware
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

// route middleware
app.use('/api/', postRoutes)
app.use('/api/', authRoutes)
app.use('/api/', orderRoutes)



// port
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on  post ${port}`))