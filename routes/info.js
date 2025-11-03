import express from 'express';
import { getData } from "../modules/getData.js";
import { getAnalysis } from '../modules/getAnalysis.js';
import { getRatings } from '../modules/ratings.js';

const router = express.Router()

let data = null;
let reply = null
let name;
let done = false

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, 1000*ms));
}


router.get('/',async (req,res)=>{

    if (data) {
        let ratings = getRatings(data.Ratings)[1]
    
    res.render("info",{title: data.Title, 
        info: data.Title,
        rated: data.Rated,
        released: data.Released,
        genre: data.Genre,
        duration: data.Runtime,
        boxoffice: data.BoxOffice,
    poster: data.Poster,
    director: data.Director,
    writer: data.Writer,
    actor: data.Actors,
    plot: data.Plot,
    awards: data.Awards,
    lang: data.Language,
    country: data.Country,
    ratings})
    }
    else {
        res.render("not_found",{title: name})
    }

    let cnt = 0
    while(!reply) {
        cnt = cnt+1
        console.log(cnt)
        await delay(1)
    }
    
})

router.post('/',async (req,res)=>{
    
    name = req.body;

    const startData = getData(name)
    const startAnalysis = getAnalysis(name)

    data = await startData
    res.json(data)
    reply = await startAnalysis
    console.log(reply)
})



export default router