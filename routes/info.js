import express from 'express';
import { getData } from "../modules/getData.js";
import { getAnalysis } from '../modules/getAnalysis.js';
import { getRatings } from '../modules/ratings.js';

const router = express.Router()

let data = null;
let reply = null
let name;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, 1000*ms));
}


router.get('/',async (req,res)=>{
    
   
    
    if (data) {
        let ratings = getRatings(data.Ratings)[1]
        let rendering = {title: data.Title, 
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
    ratings,
    reply}
    
    res.render("info",rendering)
    }
    else {
        res.render("not_found",{title: name})
    }
})

router.post('/',async (req,res)=>{
    
    name = req.body;
    data = await getData(name) 
    reply = await getAnalysis(name)
    
    console.log(reply)
    res.json(data)
})



export default router