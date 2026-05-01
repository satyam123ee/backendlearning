
import dotenv from "dotenv"
import connectDB from "./db/index.js";


dotenv.config({path:"./.env"})

connectDB()

/*import express from "express"
const app = express()

 ( async()=>{
 try {
   await mongoose.connect('${process.env.MONGO_URI}/${DB_NAME}')
   app.on("error",(error)=>{
    console.log("ERROR:",error);
    throw error
   })
    app.listen(process.env.PORT,()=>{
        console.log('app is listening pn port ${process.env.PORT}')
    })
 } catch (error) {
    console.log('Error connecting to MongoDB:', error);
    throw error; // Rethrow the error to be caught by the outer catch block
}






 })() // IIFE (Immediately Invoked Function Expression) to avoid global scope pollution
*/
