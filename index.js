import express from "express";

const app = express()
const port = 3000

// set ejs as view engine
app.set('view engine', 'ejs')

app.get('/', (req,res) => {
    res.render("index",{App:'Cine Friend'})
})
app.listen(port, ()=>{
    console.log(`App live at http://localhost:${3000}`)
})