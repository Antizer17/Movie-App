import {z} from "zod";

const createWatchlistItemSchema = z.object({
    movieId: z.string().uuid("Invalid Movie ID format"), // Standard UUID check
    status: z.enum(["TO_WATCH", "WATCHING", "WATCHED"], {
        errorMap: () => ({ message: "Status must be one of: TO_WATCH, WATCHING, WATCHED" })
    }).optional(),
    rating: z.coerce.number()
        .min(1, "Rating must be between 1 to 10")
        .max(10, "Rating must be between 1 to 10")
        .optional(),
    review: z.string().optional(),
})
export default createWatchlistItemSchema;
