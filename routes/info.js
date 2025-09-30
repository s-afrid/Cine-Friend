import express from 'express';
import { getData } from "../modules/getData.js";

const router = express.Router()

let data = null;

router.get('/',(req,res)=>{
    res.render("info",{title: data.Title, 
        info: data.Title,
    poster: data.Poster})
})

router.post('/',async (req,res)=>{
    const name = req.body;
    data = await getData(name)
    res.json(data)
})



export default router