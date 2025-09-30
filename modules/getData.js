import fetch from "node-fetch";
import { parseMovieInput } from "./parsemoviein.js";

// Import dotenv
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

export const getData = async (movie) => {
    
    const apiKey = process.env.OMDB_API_KEY;
    let {name, year} = parseMovieInput(movie)
    let url = `https://www.omdbapi.com/?t=${encodeURIComponent(name)}&apikey=${apiKey}`
    if (year) {
    url += `&y=${year}`;
  }

    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
        return data
    } else {
        return null
    }
}