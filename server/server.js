const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const dotenv = require('dotenv')
const mongoose = require('mongoose')


const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.DB_CONNECT, () => {
    console.log(`Connected to MongoDB Database`);
});

// ROUTES
const authRouter = require('./router/authRoute')
app.use('/auth', authRouter)

const userRouter = require('./router/userRouter')
app.use('/users', userRouter)

app.disable("x-powered-by");
app.use(helmet())
app.listen(PORT, () => {
    console.log(`Server Started on PORT: ${PORT}`);
})