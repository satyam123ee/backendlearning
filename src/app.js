import express from "express"
import cors from "cors" // Cross-Origin Resource Sharing (CORS) middleware
import cookieParser from "cookie-parser" // Middleware to parse cookies from incoming requests


const app = express() // Create an instance of the Express application

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

export { app }
