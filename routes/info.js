import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
import { getData } from "../modules/getData.js";

const router = express.Router()

let data = null;

router.get('/',(req,res)=>{
    res.render("info")
})

router.post('/',async (req,res)=>{
    const name = req.body;
    data = await getData(name)
    res.json(data)
})



export default router