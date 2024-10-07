import express from "express"  // It provides methods and functionality to handle HTTP requests, routing, and middleware.
import cors from "cors"        // A middleware that allows you to manage Cross-Origin Resource Sharing (CORS), which controls which domains are allowed to make requests to your backend.
import cookieParser from "cookie-parser"  // A middleware is used to parse cookies sent by the client in HTTP requests, making it easy to access cookies in your server.

const app = express()

app.use(cors({                            
    origin: process.env.CORS_ORIGIN, // Frontend URL or '*' (for all origins) or from where can accept request from frontend 
    credentials: true                //  allows the server to accept requests that include credentials, such as cookies, authorization headers, or TLS client certificates.
}))

app.use(express.json({limit: "16kb"}))   // accept json file with limit
app.use(express.urlencoded({extended: true, limit: "16kb"}))   // This middleware parses incoming requests with URL-encoded payloads (typically from HTML forms).
app.use(express.static("public"))        // This middleware serves static files (like images, CSS files, JavaScript files) from the "public" directory.
app.use(cookieParser())      // This middleware parses cookies attached to incoming client requests. This allows you to access cookies easily using req.cookies in your routes.


//routes import
import userRouter from './routes/user.routes.js'
import healthcheckRouter from "./routes/healthcheck.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import videoRouter from "./routes/video.routes.js"
import commentRouter from "./routes/comment.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"

//routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/dashboard", dashboardRouter)

// http://localhost:8000/api/v1/users/register

export { app }
