import fetch from "node-fetch";

export const getData = async (movie) => {
    const apiKey = "c20d6271";
    const response = await fetch(`https://www.omdbapi.com/?t=${movie}&apikey=c20d6271`);
    const data = await response.json();

    if (data.Response === "True") {
        return data
    } else {
        return null
    }
}