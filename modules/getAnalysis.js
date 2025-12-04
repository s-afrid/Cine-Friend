import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";

// Load .env variables
dotenv.config({ path: path.resolve("./.env") });

export const getAnalysis = async (movie, director) => {
  // 1. Safety Check: Ensure API Key exists before attempting request
  if (!process.env.OPEN_ROUTER_LLM_KEY) {
    console.error("Error: OPEN_ROUTER_LLM_KEY is missing in .env");
    return generateErrorHtml(movie, "API Configuration Error");
  }

  const prompt = `Analyze the movie "${movie}" directed by "${director}" as if you are a professional film critic and cinephile. Your response must be written entirely in clean, well-structured HTML format with consistent tags every time.  

  Follow this structure exactly for every response:
  <html>
    <body>
      <h1 class="font-extrabold text-lg">[Movie Title] — A Critical Analysis</h1>
      <h2 class="font-bold text-md">1. Introduction</h2>
      <p>Brief introduction to the film, its director, release year, and cultural or cinematic significance.</p>
      <h2 class="font-bold text-md">2. Narrative Analysis</h2>
      <p>Discuss the film’s story structure, pacing, character arcs, and thematic depth. Mention how it connects to the director’s vision and contemporary cinema.</p>
      <h2 class="font-bold text-md">3. Technical Aspects</h2>
      <p>Analyze cinematography, sound design, editing, lighting, and visual effects. Reference any signature techniques of the director or production style.</p>
      <h2 class="font-bold text-md">4. Historical and Cultural Context</h2>
      <p>Explore when and why the film was made, what social, political, or artistic climate influenced it, and how audiences or critics received it.</p>
      <h2 class="font-bold text-md">5. Meta References & Cinematic Influences</h2>
      <p>Discuss intertextual or meta-cinematic references—films, directors, or artistic movements that influenced this movie’s style or message.</p>
      <h2 class="font-bold text-md">6. Conclusion</h2>
      <p>Summarize the overall impact, legacy, and artistic merit of the film. Provide a closing thought that reflects both critical and emotional resonance.</p>
    </body>
  </html>

  Return **only** the HTML code above (no explanations, no Markdown, no notes).`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_ROUTER_LLM_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "CineFriend",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct:free",
        messages: [
          { role: "system", content: "You are a helpful film critic assistant." },
          { role: "user", content: prompt },
        ],
      }),
    });

    // 2. Network Response Handling (Catch 4xx/5xx errors)
    if (!response.ok) {
      const errorText = await response.text(); // Get raw text in case JSON parse fails
      console.error(`LLM API Error: ${response.status} ${response.statusText} - ${errorText}`);
      return generateErrorHtml(movie, "Service temporarily unavailable. Please try again.");
    }

    const data = await response.json();

    // 3. API Logic Handling (Catch API-specific errors in JSON)
    if (data.error) {
      console.error("OpenRouter API Error:", data.error);
      return generateErrorHtml(movie, data.error.message || "Unknown API Error");
    }

    // 4. Content Validation (Ensure content actually exists)
    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      console.error("Received empty response from LLM");
      return generateErrorHtml(movie, "Analysis could not be generated.");
    }

    return reply;

  } catch (error) {
    // 5. Catastrophic Error Handling (Network down, DNS fail, Code crash)
    console.error("CRITICAL FETCH ERROR:", error);
    return generateErrorHtml(movie, "Connection to analysis service failed.");
  }
};

/**
 * Helper function to generate a safe HTML fallback
 * This ensures the UI never breaks even if the backend fails completely.
 */
function generateErrorHtml(movieTitle, errorMessage) {
  return `
    <html>
      <body>
        <h1 class="font-extrabold text-lg text-amber-900">Analysis Unavailable: ${movieTitle}</h1>
        <div class="p-4 border border-red-900 bg-white rounded">
            <h2 class="font-bold text-md">System Error</h2>
            <p>We could not retrieve the critical analysis at this time.</p>
            <p><strong>Reason:</strong> ${errorMessage}</p>
        </div>
      </body>
    </html>
  `;
}