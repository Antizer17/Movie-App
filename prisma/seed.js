import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
const userId = "aa51bed4-4862-4e6c-866a-d330a070dcf9"
const mockMovies = [
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    releaseDate: "1994-09-22T00:00:00.000Z",
    genre: ["Drama"],
    runtime: 142,
    rating: 9.3,
    posterUrl: "https://example.com/shawshank.jpg",
    uploadedBy: userId
  },
  {
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    releaseDate: "1972-03-24T00:00:00.000Z",
    genre: ["Crime", "Drama"],
    runtime: 175,
    rating: 9.2,
    posterUrl: "https://example.com/godfather.jpg",
    uploadedBy: userId
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    releaseDate: "2008-07-18T00:00:00.000Z",
    genre: ["Action", "Crime", "Drama"],
    runtime: 152,
    rating: 9.0,
    posterUrl: "https://example.com/darkknight.jpg",
    uploadedBy: userId
  },
  {
    title: "The Godfather Part II",
    description: "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
    releaseDate: "1974-12-20T00:00:00.000Z",
    genre: ["Crime", "Drama"],
    runtime: 202,
    rating: 9.0,
    posterUrl: "https://example.com/godfather2.jpg",
    uploadedBy: userId
  },
  {
    title: "12 Angry Men",
    description: "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them more carefully to consider the evidence before jumping to a hasty verdict.",
    releaseDate: "1957-04-10T00:00:00.000Z",
    genre: ["Crime", "Drama"],
    runtime: 96,
    rating: 9.0,
    posterUrl: "https://example.com/12angrymen.jpg",
    uploadedBy: userId
  },
  {
    title: "Schindler's List",
    description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    releaseDate: "1993-12-15T00:00:00.000Z",
    genre: ["Biography", "Drama", "History"],
    runtime: 195,
    rating: 9.0,
    posterUrl: "https://example.com/schindlerslist.jpg",
    uploadedBy: userId
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    description: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    releaseDate: "2003-12-17T00:00:00.000Z",
    genre: ["Action", "Adventure", "Drama"],
    runtime: 201,
    rating: 9.0,
    posterUrl: "https://example.com/returnoftheking.jpg",
    uploadedBy: userId
  },
  {
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    releaseDate: "1994-10-14T00:00:00.000Z",
    genre: ["Crime", "Drama"],
    runtime: 154,
    rating: 8.9,
    posterUrl: "https://example.com/pulpfiction.jpg",
    uploadedBy: userId
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    releaseDate: "2001-12-19T00:00:00.000Z",
    genre: ["Action", "Adventure", "Drama"],
    runtime: 178,
    rating: 8.9,
    posterUrl: "https://example.com/fellowship.jpg",
    uploadedBy: userId
  },
  {
    title: "The Good, the Bad and the Ugly",
    description: "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
    releaseDate: "1966-12-23T00:00:00.000Z",
    genre: ["Adventure", "Western"],
    runtime: 178,
    rating: 8.8,
    posterUrl: "https://example.com/goodbadugly.jpg",
    uploadedBy: userId
  }
];

async function main(){
    console.log("seeding movies...")
    for(const movie of mockMovies){
        await prisma.movie.create({
            data:movie
        })
        console.log(`Created movie: ${movie.title}`)
    }
    console.log("seeding complete! :D")
}

main().catch((err)=>{
    console.error(err)
    process.exit(1)
}).finally(async ()=>{
    await prisma.$disconnect();
})