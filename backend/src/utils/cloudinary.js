import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    console.log(localFilePath);
    try {
        console.log("enter uploadOnCloudinary");
        if (!localFilePath) return null;
        console.log("enter if");
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })
        console.log("enter respones");
        // file is uploaded successfully
        // console.log("file is uploaded on cloudinary",response.url);
        // console.log("file is uploaded on cloudinary",response);
        fs.unlinkSync(localFilePath) // delete the file from local storage
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath); // delete the file if it is not uploaded on cloudinary
    }
}

export { uploadOnCloudinary}