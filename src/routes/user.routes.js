import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";  
const router = Router();

router.route("/register").post(registerUser) //for user registration





export default router;  