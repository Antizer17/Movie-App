import express from 'express';
import Router from 'express';

const router =express.Router()

router.get('/',(req,res)=>{
    res.json({message:'Hello! :D'})
})

export default router