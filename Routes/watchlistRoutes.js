import express from 'express';
import Router from 'express';
import { addWatchListItem,deleteWatchListItem, updateWatchListItem } from '../Controllers/watchListController.js';
import authMiddleWare from '../middleware/authMiddleware.js';
import createWatchlistItemSchema from '../validators/createWatchListItemSchema.js';
import validateRequest from '../middleware/validateRequests.js';

const router =express.Router()
// router.use(authMiddleWare)
router.post('/add',validateRequest(createWatchlistItemSchema),addWatchListItem)
router.delete('/add/:id',deleteWatchListItem)
router.put('/add/:id',updateWatchListItem)

export default router;