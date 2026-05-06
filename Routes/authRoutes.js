import express from 'express';
import Router from 'express';
import {register} from '../Controllers/authController.js'
const router = express.Router()

router.post('/register', register)

export default router;