import 'dotenv/config'
import express from 'express';
import movieRoutes from './Routes/movieRoutes.js';
import authRoutes from './Routes/authRoutes.js';
import { connectDB,disconnectDb } from './config/database.js';
import watchListRoutes from './Routes/watchlistRoutes.js'
import cookieParser from 'cookie-parser';


const app = express();
async function startServer(){
    try{
        await connectDB()
        console.log("connected to the database successfully! via prisma");
        const server = app.listen(process.env.PORT || 3000, ()=>{
        console.log('Server is running on port 3000!');
})
    }catch(err){
        console.error('Error connecting to the database:', err);
    }
}

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',movieRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/watchlist',watchListRoutes)
app.use(cookieParser());
startServer()

process.on('unhandledRejection', (err)=>{
    console.error('Unhandled Rejection:', err);
    server.close(async()=>{
        await disconnectDb()
        process.exit(1);
    })
})

process.on('uncaughtException', async (err)=>{
    console.error('Uncaught Exception:', err);
    await disconnectDb()
    process.exit(1);
})

process.on('SIGTERM', async ()=>{
    console.log('Process terminated gracefully');
    server.close(async()=>{
        await disconnectDb()   
        process.exit(0);
    })
})