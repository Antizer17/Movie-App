
import { prisma} from "../config/database.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";

async function register(req,res){
    console.log("Register endpoint hit with data:", req.body);
    const {name,email,password} = req.body
    //check if user already exists
    const userExists = await prisma.users.findUnique({
        where:{
            email:email
        }
    })
    if(userExists){
        res.status(400).json({message:"User already exists"})
        return
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    //create user
    const user = await prisma.users.create({
    data:{
        name:name,
        email:email,
        password:hashedPassword
    }
    })
    const token = generateToken(user.id,res)
    res.status(201).json({
        success:true,
        user:{
        id:user.id,
        name:user.name,
        email:user.email
    }, token})

}
const login = async (req,res)=>{
    const {email,password} = req.body
    const user= await prisma.users.findUnique({
        where:{
            email:email
        }    
    })
    if(!user){
        res.status(401).json({error:"No user found with this email"})
        return
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        res.status(401).json({error:"Invalid password"})
        return
    }else{
        const token = generateToken(user.id,res)
        res.status(201).json({success:true,
            data:{
                user: {
                id:user.id,
                name:user.name,
                email:user.email
            }
        }, token})
    }
}
async function logout(req,res){
res.cookie('jwt', "", {
    httpOnly: true,
    expires: new Date(0)
})
res.status(201).json({
    success:true,
    message:"Logout successful!"
})
}
export {register, login, logout};