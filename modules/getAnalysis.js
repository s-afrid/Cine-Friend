import fetch from "node-fetch";

// Import dotenv
import dotenv from "dotenv";

// Load .env variables
import path from "path";
dotenv.config({ path: path.resolve("./.env") });




export const getAnalysis = async (movie, director) => {


  const prompt = `Analyze the movie "${movie}" directed by "${director}" as if you are a professional film critic and cinephile. Your response must be written entirely in clean, well-structured HTML format with consistent tags every time.  

Follow this structure exactly for every response:

<html>
  <body>
    <h1 class="font-extrabold">[Movie Title] — A Critical Analysis</h1>

    <h2 class="font-bold">1. Introduction</h2>
    <p>Brief introduction to the film, its director, release year, and cultural or cinematic significance.</p>

    <h2 class="font-bold">2. Narrative Analysis</h2>
    <p>Discuss the film’s story structure, pacing, character arcs, and thematic depth. Mention how it connects to the director’s vision and contemporary cinema.</p>

    <h2 class="font-bold">3. Technical Aspects</h2>
    <p>Analyze cinematography, sound design, editing, lighting, and visual effects. Reference any signature techniques of the director or production style.</p>

    <h2 class="font-bold">4. Historical and Cultural Context</h2>
    <p>Explore when and why the film was made, what social, political, or artistic climate influenced it, and how audiences or critics received it.</p>

    <h2 class="font-bold">5. Meta References & Cinematic Influences</h2>
    <p>Discuss intertextual or meta-cinematic references—films, directors, or artistic movements that influenced this movie’s style or message.</p>

    <h2 class="font-bold">6. Conclusion</h2>
    <p>Summarize the overall impact, legacy, and artistic merit of the film. Provide a closing thought that reflects both critical and emotional resonance.</p>
  </body>
</html>

Return **only** the HTML code above (no explanations, no Markdown, no notes).
`;


    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
         Authorization: `Bearer ${process.env.OPEN_ROUTER_LLM_KEY}`,
          "HTTP-Referer": "http://localhost:3000", 
            "X-Title": "CineFriend" 
    },
      body: JSON.stringify({
        model: "minimax/minimax-m2:free",
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

