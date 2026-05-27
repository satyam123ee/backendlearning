import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"//this is from database and small user from the local  data
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

//ek method bna let eh to handle access and refrehs token
const generateAccessAndRefreshTokens = async(userId)=>{
    try {

        //sbsse phle database se by id search kro then isko ek variable mein store kr lena 
       const user = await User.findById(userId)
       const accessToken = user.generateAccessToken()
       const refreshToken =user.generateRefreshToken()
       user.refreshToken= refreshToken
       user.save({validateBeforeSave: false})
       return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500,"something  went wrong while generating access and refresh token ")
        
    }
}
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

    const existedUser = await User.findOne({$or : [{email},{username}]})
    //mongodb query to find user by email or username

    if(existedUser) {
        throw new ApiError(409,"User already exists with this email or username")//humne ek objext banaya h jisme email aur username dono ko check kr rhe h, agr koi bhi match krta h toh error throw kr do
    }   //agr user already exist krta h toh error throw kr do

    const avatar = req.files?.avatar?.[0]?.path;//agr avatar file exist krti h toh uska path le lo, warna undefined de do
    const coverImages = req.files?.coverImages?.[0]?.path;
    //agr avatar file exist krti h toh uska path le lo, aur cover images ke liye bhi same kro, agr cover images exist krti h toh unke paths le lo, warna empty array de do
    if (!avatar) {
    throw new ApiError(400,"Avatar is required")
   }
   const avatr =await uploadoncloudinary(avatar) ;//upload avatar to cloudinary
const coverImg = await uploadoncloudinary(coverImages) 
//upload cover images to cloudinary
if(!avatr) {
    throw new ApiError(500,"Failed to upload avatar")
}//agr avatar upload ni hua toh error throw kr do brna code pakka fatega
const newUser = await User.create({
    fullname,
    username,
    email,
    password,
    avatar: avatr.url, //store cloudinary url in database
    coverImage: coverImg?.url||"" }) //store cloudinary url in database
const createdUser = await user.findById(User._id).select("-password -refreshToken") //save user to database
if(!createdUser) {
    throw new ApiError(500,"Failed to create user ")//server ki galti h yha iff ni bna toh


return res.status(201).json(new ApiResponse(true,"User registered successfully",createdUser))}//return response




})//mongodb nosql h toh isme mostly object hi bnaye jate h 
const loginUser= asyncHandler(async (req,res)=>{
    //callback 
    //yodos
    //request body se data le aao
    //email ya username 
    //find the user
    //password(valid or not)
    
    //acess and refresh token dena 
    // send krdo cookies mein
const{email,username ,password}= req.body
  if(!username||!email){
    throw new ApiError(400,"username or email is required")

  }
 const user =await user.findOne({$or
    :[{email},{username}]
})//database dusre continent mein bhi ho skta h 
if(!user ){
    throw new ApiError(400,"user not found")
}

 const isPasswordValid=await user.isPasswordCorrect(password)
 if(!isPasswordValid ){
    throw new ApiError(400,"password is incorrect ")
}
const{accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id)
 const loggedInUser = await User.findById(user._id).select("-password ","-refreshToken")

//now hume ek cookie bnani h 
const option ={
    httpOnly:true,
    secure: true //ye sirf server se hi change ho  sakti h frontend baegra koi bhi isko change ni kr skta
//intilisation of cookie

}
return res
.status(200)
.cookie("accessToken",accessToken,option)
.cookie("refreshToken",refreshToken,option)
.json( 
        new ApiResponse(
        200,
        {
            user: loggedInUser,accessToken,refreshToken
        } ,  
        "user logged in successfully"
)
)



})

const logoutUser = asyncHandler(async(req,res)=>{
     User.findByIdAndUpdate(req.user._id,)
export {
    loginUser, 
    logoutUser,
     registerUser }





//note that asynchandler is used to handle web request and async is used to handle internal request 