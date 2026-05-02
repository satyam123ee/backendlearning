/*import mongoose,{Schema} from "mongoose"; 
import bcrypt from "bcrypt" 
import jwt from "jsonwebtoken"
const userSchema = new Schema({
     username:{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
         
     },
        email:{
        type : String,
        required : true,
            
        unique : true,
        lowercase : true,
        trim : true
        
     }, fullname:{
        type : String,
        required : true,
        lowercase : true,
        trim : true
        
     }, 
     avatar:{
        type : String,//cloudinary url
        required: true,
     },
     coverImage:{
        type : String,//cloudinary url
       },
       watchHistory:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
       }],
       password:{
        type : String,
        required : [true, "Password is required"]},//but this is the challange for us of how to store the paaword in that
        refreshToken:{
            type : String
        },
        
        
   
        

    }
      , {
     timestamps : true   
})
 
userSchema.pre("save", async function(next)  //this is the middleware that will be executed before saving the user to the database
{
//yhs pe arrow baala kyu ni use kra
//kyuki arrow function me this ka reference nahi hota hai, isliye hum normal function ka use karte hain taki this ka reference userSchema ko mile
 this.password = await bcrypt.hash(this.password, 10)
 if(!this.isModified("password")) return next(); //agar password modify nahi hua hai to next() call kar do, warna password ko hash kar do 
 next()//hashing the password before saving it to the database





})

userSchema.methods.isPasswordValid = async function(password){
    return await bcrypt.compare(password, this.password) //this.password is the hashed password stored in the database, and password is the plain text password entered by the user, we are comparing them using bcrypt.compare() method which returns true if they match and false if they don't match
}





export default mongoose.model("User",userSchema) 

//jwt token ek bearer token hota hai, jisme user ki information hoti hai, aur usko sign karne ke liye ek secret key hoti hai, jisse hum verify kar sakte hain ki token valid hai ya nahi, aur usme se user ki information nikal sakte hain, taki hum user ko authenticate kar sakein, aur uske permissions check kar sakein.*/
import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)