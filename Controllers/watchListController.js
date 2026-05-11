import { prisma} from "../config/database.js"

async function addWatchListItem(req,res){
    const {movieId,status,rating,review} = req.body
    const isMovie = prisma.movie.findUnique({
        where:{
            title:movieId
        }})
    if(!isMovie){
       return res.status(404).json({success:false, error:"Movie does not exist!"})
    }
    const inWatchlist = await prisma.watchListItem.findUnique({
        where:{
            userId_movieId: {
                userId: req.user.id,
                movieId: movieId
            }
        }
    })
    if(inWatchlist){
        return res.status(400).json({success:false,
            error:`${movieId} already in watchlist`
        })
    }
    const watchListItem = await prisma.watchListItem.create({
        data:{
            userId: req.user.id,
            movieId,
            status: status || "TO_WATCH",
            rating: rating ? parseFloat(rating) : null,
            review
            
        }
    })
    res.status(201).json({status:'Success',data:{
        watchListItem
    }})

}

async function deleteWatchListItem(req,res){
    const itemId = req.params.id
    const userExists  = prisma.users.findUnique({
        where:{
            id:req.user.id
        }
    })
    const itemExists  = await prisma.watchListItem.findUnique({
        where:{
            id:itemId
        }
    })
    if(!itemExists){
        return res.status(404).json({error:"Watchlist item not found."})
    }
    if(itemExists.userId !== req.user.id){
        return res.status(403).json({error:"Not authorized to perform this action"})
    }
    try{
        await prisma.watchListItem.delete({
            where:{
                id:itemId
            }
        })
    }catch(err){
        return res.status(500).json({
            error:`${err}`
        })
    }
    
}
async function updateWatchListItem(req,res){
    const itemId = req.params.id
    const {status, rating, review}=req.body
    const itemExists  = await prisma.watchListItem.findUnique({
        where:{
            id:itemId
        }
    })
    if(!itemExists){
        return res.status(404).json({error:"Watchlist item not found."})
    }
    if(itemExists.userId !== req.user.id){
        return res.status(403).json({error:"Not authorized to perform this action"})
    }
    try{
       const updatedItem = await prisma.watchListItem.update({
            where:{
                id:itemId
            },data:{
                status: status || itemExists.status,
                rating: rating!==undefined ? parseFloat(rating) : itemExists.rating,
                review: review !==undefined ? review : itemExists.review
            }
        })
        res.status(201).json({status:"Success", data:{updatedItem} })
    }catch(err){
        return res.status(500).json({
            error:`${err}`
        })
    }
    
}

export {addWatchListItem,deleteWatchListItem,updateWatchListItem}