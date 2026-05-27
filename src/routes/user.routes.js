import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controllers.js";  
import { upload  } from "../middleware/multer.middleware.js";
console.log("User routes loaded");
const router = Router();

router.route("/register").post(
    upload.fields([
        
        { name: "coverImages", maxCount: 5 }
    ]),
    registerUser) //for user registration

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)
//yha middleware inject kaise krte h jo bhi method ue ho rha h usse phle middleware ko call kr lete h


export default router;  