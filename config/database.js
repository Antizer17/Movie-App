import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ['query', 'error', 'warn'] : ['error']
})

const connectDB = async ()=>{
    try{
        await prisma.$connect()
        console.log('Connected to the database successfully! via prisma');
    }catch(err){
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    }
const disconnectDb = async()=>{
    await prisma.$disconnect()
}
export {prisma,connectDB, disconnectDb };
