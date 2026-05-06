
import { prisma} from "../config/database.js"
import bcrypt from "bcryptjs"

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
    res.status(201).json({
        success:true,
        user:{
        id:user.id,
        name:user.name,
        email:user.email
    }})

}

export {register};