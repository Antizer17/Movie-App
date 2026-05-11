import jwt from "jsonwebtoken"
import { prisma } from "../config/database.js"; 

async function authMiddleWare(req,res,next){
    console.log('Auth Middleware hit!')
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }else if(req.cookies?.jwt){
        token = req.cookies.jwt
    }
    if(!token){
       return res.status(401).json({error:"Not authorized, no token provided."})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await prisma.users.findUnique({
        where:{
            id: decoded.id
        }
    })
        if(!user){
            return res.status(401).json({
            error:"User does not exist."
        })}
        req.user = user
        next()
    }catch(err){
        return res.status(401).json({error:`${err}`})
    }
    
}

export default authMiddleWare;