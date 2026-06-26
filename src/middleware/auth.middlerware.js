import { application } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
export const verifyJWT = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.acessToken||req.header("Authorization")?.replace("Bearer","")//this is the middleware 
    if(!token){
        throw new ApiError(401,"unauthoized request ")
    }
    
    const decodedToken =jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
     await User.findById(decodedToken?._id).select("-password -refreshToken")
    
     if(!user ){
        throw new ApiError(401,"invalid access token")
     }
    
     req.user = user;
     next( )
    
    } catch (error) {
        throw new ApiError(401,error?.message||"invalid acess token")
    }
})//header for mobile development 

//auth ka middleware use isiliye krte h kyuki bus ye verify krega ki ye user login h ya ni h 