import express from 'express';
import { getData } from "../modules/getData.js";
import { getRatings } from '../modules/ratings.js';

const router = express.Router()

let data = null;
let name;


router.get('/',(req,res)=>{
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
    
})

router.post('/',async (req,res)=>{
    name = req.body;
    data = await getData(name)
    res.json(data)
})



export default router