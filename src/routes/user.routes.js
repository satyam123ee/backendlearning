import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";  
import { upload  } from "../middleware/multer.middleware.js";
const router = Router();

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImages", maxCount: 5 }
    ]),
    registerUser) //for user registration


//yha middleware inject kaise krte h jo bhi method ue ho rha h usse phle middleware ko call kr lete h


export default router;  