const express=require('express')
const morgon=require('morgan')
const cors=require('cors')
const dotenv=require('dotenv')
const connectDB = require('./MVC/config/connectDB')
const router = require('./MVC/route/userRoute')
const app=express()
// config dotenv
dotenv.config()
// call db
connectDB()
// middleware
app.use(morgon('dev'))
app.use(express.json())
app.use(cors())
// API
app.use("/api/v1/user", router);
// route
app.get('/',(req,res)=>{
    res.send("<h1>hello server </h1>")
})
// listen
const PORT=8080||process.env.PORT
app.listen(PORT,()=>{
    console.log("listenin to port "+PORT)
})