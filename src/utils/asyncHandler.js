/* asyncHandler function is a middleware utility used in Express.js applications to simplify error handling for asynchronous route handlers 
(functions that return promises).*/

const asyncHandler = (requestHandler) => {    // higher-order function, it takes a function (requestHandler) as an argument and returns a new function (middleware).
    // requestHandler represents the route handler or middleware that contains asynchronous code (e.g., API calls, database queries, etc.).
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err)) // This is used to handle the requestHandler function, which could return a promise (from an asynchronous operation).
        /*If the requestHandler function succeeds, it simply resolves the promise.
          If the requestHandler throws an error or the promise rejects, it will be caught by the catch() block.
        catch((err) => next(err)): If there’s any error in the asynchronous code, the error is passed to next(), which is the standard way in Express to 
        forward errors to error-handling middleware.*/
    }
}


export { asyncHandler }




// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}


// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }
