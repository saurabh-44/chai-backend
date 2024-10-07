import {v2 as cloudinary} from "cloudinary"   // v2 import from the Cloudinary SDK allows you to use Cloudinary’s API for uploading and managing files in the cloud.
import fs from "fs"                           // This module is used for handling local file operations, such as deleting a file after it has been uploaded.


cloudinary.config({                           // function is used to configure your Cloudinary account with credentials from your environment variables (.env file).
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {   // localFilePath, which is the path to the file stored locally on your server that you want to upload to Cloudinary.
    try {
        if (!localFilePath) return null                 // If it's missing, the function returns null and stops further execution.
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {  // This method uploads the file located at localFilePath to Cloudinary.
            resource_type: "auto"      // This option tells Cloudinary to automatically detect the type of file (image, video, etc.), so you don't need to manually specify it.
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)   //  This deletes the temporary file stored on your local machine after it has been successfully uploaded to Cloudinary. This helps keep your server clean by not retaining unnecessary files.
        return response;               //  returns the response from Cloudinary, which contains important information like the uploaded file’s URL.

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export {uploadOnCloudinary}          //  exports the uploadOnCloudinary function 
