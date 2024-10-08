/* defines middleware for verifying JSON Web Tokens (JWT) and ensuring that only authenticated users can access certain API routes.*/

import { ApiError } from "../utils/ApiError.js";            // custom error class to handle API errors.
import { asyncHandler } from "../utils/asyncHandler.js";    // A utility to handle asynchronous functions and catch errors.
import jwt from "jsonwebtoken"                              // A library to verify and decode JWT tokens.
import { User } from "../models/user.model.js";             // Mongoose model representing the user in the database.

export const verifyJWT = asyncHandler(async(req, _, next) => {   // middleware function verifies that the incoming request has a valid JWT and that the token belongs to an existing user.
     /*   req: The request object.
           _: The response object (unused here, hence _ is used).
           next: Function to call the next middleware in the stack.*/
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        /* Cookies: It checks if the token is available in the accessToken cookie (req.cookies?.accessToken).
           Authorization Header: If the token is not in the cookie, it checks the Authorization header (req.header("Authorization")). 
                                 If the header is present in the format Bearer <token>, the Bearer prefix is removed using .replace().
           If neither is present, token will be undefined.*/
    
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")   // This ensures that requests without a valid token are blocked from proceeding.
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) // jwt.verify() method is used to decode and verify the token against a secret key
                                                                                // If the token is valid, it returns the decoded payload
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        /* After the token is decoded, the user ID (_id) is extracted from the token payload.
           The middleware then checks the database (User.findById()) to find the user by their ID. The select("-password -refreshToken") part excludes the 
           sensitive password and refreshToken fields from the query result.
           This ensures that even if user data is passed to the request, sensitive information like passwords is not included.*/
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token") // If no user is found in the database that matches the token’s user ID, an error is thrown 
        }
    
        req.user = user;  // If a valid user is found, the user object is attached to the req (request) object as req.user. 
                          // This allows the authenticated user's data to be accessed in subsequent middleware or route handlers.
        
        next()            // called to proceed to the next middleware or route handler.
        
    } catch (error) {     // If any error occurs during the verification process (e.g., invalid token, user not found), an ApiError with status 401 is thrown. 
                          // If the error has a specific message, it is included; otherwise, the default message "Invalid access token" is used.
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})
