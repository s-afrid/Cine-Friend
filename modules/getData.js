import fetch from "node-fetch";

// Import dotenv
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

export const getData = async (movie) => {
    const apiKey = process.env.OMDB_API_KEY;
    const response = await fetch(`https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`);
    const data = await response.json();

    if (data.Response === "True") {
        return data
    } else {
        return null
    }
}