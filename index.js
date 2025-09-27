import express from "express";

const app = express()
const port = 3000

app.get('/', (req,res) => {
    res.send(`Testing express ${port}`)
})
app.listen(port, ()=>{
    console.log(`App live at http://localhost:${3000}`)
})