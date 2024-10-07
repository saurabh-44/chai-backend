import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"             // JSON Web Token, used for generating tokens (e.g., for authentication).
import bcrypt from "bcrypt"                // A library used for hashing passwords securely.

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,         // Removes whitespace from both ends of the string
            index: true         // Creates an index for efficient querying.
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String     // Stores a refresh token that allows the user to get new access tokens without logging in again.
        }

    },
    {
        timestamps: true    //  adds createdAt and updatedAt fields automatically, keeping track of when the user was created or last updated.
    }
)

userSchema.pre("save", async function (next) {         // pre("save"): Mongoose middleware function that runs before saving a user document to the database.
    if(!this.isModified("password")) return next();    // code checks if the password field has been modified. If it hasn't, it skips the password hashing step.

    this.password = await bcrypt.hash(this.password, 10) // This hashes the user's password with a salt factor of 10 (making it more secure). The hashed password is then stored in the database instead of the plain text password.
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){ // A custom method that checks if a given password matches the hashed password stored in the database.
    return await bcrypt.compare(password, this.password)  // Compares the plain-text password with the hashed password and returns true if they match, false otherwise.
}

userSchema.methods.generateAccessToken = function(){      // This method generates a JWT (JSON Web Token) for authentication.
    return jwt.sign(   // The token is signed with a secret (ACCESS_TOKEN_SECRET) and has an expiration time (ACCESS_TOKEN_EXPIRY), both defined in the .env file.
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){  // This method generates a refresh token, which is used to get new access tokens when the current one expires.
    return jwt.sign(
        {
            _id: this._id,  // The payload only includes the user's _id, and it is signed with a different secret (REFRESH_TOKEN_SECRET) and has a separate expiration time (REFRESH_TOKEN_EXPIRY).
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)
