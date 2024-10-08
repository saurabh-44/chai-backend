/* ApiError class is a custom error handler used to represent and manage errors in an API. It extends the built-in JavaScript Error class and adds additional 
properties specific to API error responses. This helps in sending consistent error messages and handling them in a structured way across the application.*/

class ApiError extends Error {
    constructor(
        statusCode,  // Represents the HTTP status code (e.g., 400 for "Bad Request", 404 for "Not Found", 500 for "Internal Server Error").
                     // This allows the API to return an appropriate error code when something goes wrong.
        message= "Something went wrong",  // If no message is provided, the default message is "Something went wrong". This makes it easy to identify the error in logs or responses.
        errors = [], // An array of additional error details. contain more specific information about the error (such as validation errors, failed operations, etc.), 
                     // giving the client more context on what went wrong.
        stack = ""   // Represents the stack trace, which is useful for debugging. If no stack is provided, the constructor will automatically capture the stack trace for the error using Error.captureStackTrace.
    ){
        super(message)  // Calls the parent Error class’s constructor with the message parameter, allowing the ApiError class to inherit the basic error functionality from Error.
        this.statusCode = statusCode // Sets the status code for the error. This is useful for sending the appropriate HTTP status in the response.
        this.data = null // Sets data to null because in error scenarios, you typically don’t have useful data to return.
        this.message = message // Sets the error message, allowing you to display a user-friendly message in the response.
        this.success = false;  // indicate that an error occurred. This helps differentiate between successful and failed API responses.
        this.errors = errors   // Stores any additional error details, allowing you to send more detailed error information (e.g., validation issues, specific field errors).

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor) // If no stack trace is provided, it uses Error.captureStackTrace to automatically capture and 
                                                            // assign the stack trace to the error object. This is helpful for debugging, especially during development.
        }

    }
}

export {ApiError}
