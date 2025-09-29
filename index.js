import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getData } from "./modules/getData.js";
import cors from 'cors';

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set ejs as view engine
app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "views"));
// include static files
app.use(express.static(path.join(__dirname, "public")));
// Parse text and json
app.use(express.text())
// for cors
app.use(cors())



app.get('/', (req,res) => {
    res.render("index",{App:'Cine Friend'})
})
app.post('/',(req,res)=>{
    const name = req.body;
    let data = getData(name)
    console.log(data.Title);
    
    res.send(data)
    
})

app.listen(port, ()=>{
    console.log(`App live at http://localhost:${3000}`)
})