import fetch from "node-fetch";

// Import dotenv
import dotenv from "dotenv";

// Load .env variables
import path from "path";
dotenv.config({ path: path.resolve("./.env") });




export const getAnalysis = async (movie) => {


  const prompt = `Analyze the movie ${movie} as if you are a professional critic and a cinephile and give me meta references. Analyze both its narrative and technical aspects. Research the director and historical context.`;


    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
         Authorization: `Bearer ${process.env.OPEN_ROUTER_LLM_KEY}`,
          "HTTP-Referer": "http://localhost:3000", 
            "X-Title": "CineFriend" 
    },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          { role: "system", content: "You are a helpful film critic assistant." },
          { role: "user", content: prompt },
        ],
      })
    }
)

    
    
    const data = await response.json();

if (data.error) {
      console.error("API Error:", data.error);
      return;
    }

    const reply = data.choices?.[0]?.message?.content;
    return reply;
};

