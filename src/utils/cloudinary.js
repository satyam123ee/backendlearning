import { v2 as cloudinary } from "cloudinary";

import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadoncloudinary = async (file) => {
  try {
    //for hold
    if(!file) return null
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto"
    });
    console.log("file is uploaded to cloudinary", result.url);
    return result;
  } catch (error) {
    fs.unlinkSync(file); // Remove the temporary saved file as the upload operation got failed 
    console.error("Error uploading to Cloudinary:", error);
return null
;


  }//for a cleaning purpose temp aur corrupted files ko server e hta dena chayiye
};


export default uploadoncloudinary;import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export {uploadOnCloudinary}