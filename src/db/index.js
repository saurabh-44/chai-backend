import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";  // constant is imported from a constants.js file. It likely holds the name of the specific MongoDB database you'll be working with.

/*process.env.MONGODB_URI: This is the MongoDB connection URI stored in your .env file. It includes the credentials (username, password) and the cluster URL.
/${DB_NAME}: This adds the specific database name (defined in constants.js) to the connection string. MongoDB allows multiple databases in one cluster, 
and here you're specifying which database you want to use.*/
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) // Once the connection is successful, this line logs a message to the console, 
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB   // exports the connectDB function as the default export from this module. This allows other files (like your index.js file) to import 
// and use this function to connect to MongoDB.
