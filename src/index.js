// require('dotenv').config({path: './env'})      // not a good practice because it breaks the consistancy of code.

import dotenv from "dotenv"             // It allows you to access variables defined in the .env file (like PORT, MONGODB_URI, etc.).
import connectDB from "./db/index.js";  // function that handles the connection to your MongoDB database.
import {app} from './app.js'            // This is the Express application object. It represents your server, where you'll define routes, middleware, etc.

dotenv.config({                         // This line loads the environment variables from the .env file into the process.env object.
    path: './.env'
})

connectDB()                             // connects to MongoDB using the connection string defined in the .env file (MONGODB_URI).
.then(() => {                           // then() block is executed once the database connection is successful.
    app.listen(process.env.PORT || 8000, () => {     // starts your Express server. The first argument is the port number on which the server will run.
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {                      // If the connection to the MongoDB database fails, the catch() block logs an error message to the console along with the error details.
    console.log("MONGO db connection failed !!! ", err);
})


// database always should be in try catch method

/*
import mongoose from 'mongoose';
import {DB_NAME} from './constrants';

import express from "express"
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/
