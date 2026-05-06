import express from 'express';
import Router from 'express';
const router = express.Router()

router.put('/register',(req,res)=>{
    const data = req.body
    res.json({message:`Hello ${data.name}! :D`})
})

export default router;