import multer from "multer";   // a middleware for handling file uploads in Node.js. Multer allows you to store and manage uploaded files (like images, videos, etc.) on the server. 

const storage = multer.diskStorage({           //  It allows you to control where and how the files will be saved on the server.
    destination: function (req, file, cb) {    //  function sets the folder where uploaded files will be saved
      cb(null, "./public/temp")                // The callback cb(null, "./public/temp") sets the destination directory to ./public/temp. All uploaded files will be stored in this folder temporarily.
    },
    filename: function (req, file, cb) {       // function sets the file name for the uploaded file.
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({              // This is an exported middleware that will be used in your routes to handle file uploads.
    storage, 
})


/* How It Works:
When a file is uploaded via a form (usually multipart/form-data), Multer will:
Store the file in the directory ./public/temp.
Keep the original name of the file as it was when uploaded.
You can use this upload middleware in your routes to handle file uploads. For example, if you are uploading a profile picture:
js
Copy code
app.post("/upload", upload.single("profilePic"), (req, res) => {
    res.send("File uploaded successfully");
});
The upload.single("profilePic") middleware handles a single file upload where the field name is "profilePic".
Once the file is uploaded, the route's callback function is triggered.*/
