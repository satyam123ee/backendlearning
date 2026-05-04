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
//import routes
import userRoutes from "./routes/user.routes.js"
//use routes
app.use("/api/v1/users", userRoutes)//for user related routes
//yha pe middleware use krna h

export { app }
