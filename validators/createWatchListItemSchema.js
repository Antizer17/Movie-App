import {z} from zod;

const createWatchlistItemSchema = z.object({
    movieId: z.string().uui(),
    status: z.enum(["TO_WATCH", "WATCHING", "WATCHED"],{error: ()=>{
        message: "Status must be one of : TO_WATCH, WATCHING, WATCHED"
    }}).optional(),
    rating: z.coerce.number().float("Rating must be float").min(1, "Rating must be between 1 to 10").max(10,"Rating must be between 1 to 10").optional(),
    review: z.string().optional(),
})
export default createWatchlistItemSchema;
