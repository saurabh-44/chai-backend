/* ApiResponse class is a utility to standardize the structure of responses returned by an API. 
It simplifies the process of sending consistent and informative responses to the client. */
class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode  // This is the HTTP status code (e.g., 200, 404, 500) which represents the outcome of the API request.
        this.data = data              // ctual data that you want to return in the response. It could be anything, such as an object, an array, or a message related to the request.
        this.message = message        // This is a human-readable message that describes the outcome of the request.
        this.success = statusCode < 400  // This is a boolean flag that automatically evaluates whether the request was successful based on the statusCode.
        /* If the statusCode is less than 400 (i.e., 2xx or 3xx), success is set to true, indicating the request was successful. 
        If it’s 400 or higher (4xx or 5xx), success is false, indicating an error occurred.*/
    }
}

export { ApiResponse }  // exports the ApiResponse class
