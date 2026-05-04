import { asyncHandler } from "../utils/asyncHandler";
//helper funvtion to handle async errors in controllers
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "User registered successfully"
    })
})

export { registerUser }