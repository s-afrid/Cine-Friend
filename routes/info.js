import express from 'express';
import { getData } from "../modules/getData.js";
import { getRatings } from '../modules/ratings.js';

const router = express.Router()

let data = null;


router.get('/',(req,res)=>{
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
    ratings})
})

router.post('/',async (req,res)=>{
    const name = req.body;
    data = await getData(name)
    res.json(data)
})



export default router