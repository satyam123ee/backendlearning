import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/Apierror";
import { ApiResponse } from "../utils/Apiresponse";
import{user} from "../models/user.model.js"
import { uploadToCloudinary } from "../utils/cloudinary.js";
//helper funvtion to handle async errors in controllers
const registerUser = asyncHandler(async (req, res) => {
      //get user data from request body
      //validate user data
      //tu file handle directly ni kr skta h toh multer ka use krna padega

      //check if user already exists
      //check for images and avatar
      //upload them to cloudinary
      //create user object - create entry in db
      //remove password and response token field
      //check for user creaiton
      //return response
    
const {fullname,username,email,password}=req.body
 //yha se destructure kr rhe h
 //if( fullname === "" ) ye bala bhi use kr kte ho
if([fullname,username,email,password].some((field)=>field?.trim() === "")) 
    {
        throw new ApiError( 400,"All fields are required")  
    }//agr koi bhi field empty h toh error throw kr do

    const existedUser = await user.findOne({$or : [{email},{username}]})
    //mongodb query to find user by email or username

    if(existedUser) {
        throw new ApiError(409,"User already exists with this email or username")
    }   //agr user already exist krta h toh error throw kr do

    const avatar = req.files?.avatar?.[0]?.path;
    const coverImages = req.files?.coverImages?.[0]?.path;
    //agr avatar file exist krti h toh uska path le lo, aur cover images ke liye bhi same kro, agr cover images exist krti h toh unke paths le lo, warna empty array de do
    if (!avatar) {
    throw new ApiError(400,"Avatar is required")
   }
   const avatr =await uploadToCloudinary(avatar) ;//upload avatar to cloudinary
const coverImg = await uploadToCloudinary(coverImages) 
//upload cover images to cloudinary
if(!avatr) {
    throw new ApiError(500,"Failed to upload avatar")
}//agr avatar upload ni hua toh error throw kr do brna code pakka fatega
const newUser = await user.create({
    fullname,
    username,
    email,
    password,
    avatar: avatr.url, //store cloudinary url in database
    coverImage: coverImg?.url||"" }) //store cloudinary url in database
const createdUser = await User.findById(User._id).select("-password -refreshToken") //save user to database
if(!createdUser) {
    throw new ApiError(500,"Failed to create user ")//server ki galti h yha iff ni bna toh


return res.status(201).json(new ApiResponse(true,"User registered successfully",createdUser))}//return response




})//mongodb nosql h toh isme mostly object hi bnaye jate h 


export { registerUser }