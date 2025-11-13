const movie_name = document.getElementById("movie_name");
const analyse = document.getElementById("analyse");

const loader = document.getElementsByClassName("loader")[0];

async function main() {
  
  analyse.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!movie_name.value.trim()) return alert("Enter a movie name first!");

    e.target.disabled = true;
    e.target.style.opacity = "0.6";
    loader.style.display = "block";

    try {
      const res = await fetch("/info", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: movie_name.value,
      });

      if (!res.ok) throw new Error("Request failed");

      window.location.href = "/info";
      return;
    } catch (err) {
      console.error(err);
      alert("Error fetching info!");
    } finally {
      e.target.disabled = false;
      loader.style.display = "none";
    }
  });
}

window.addEventListener("DOMContentLoaded", main);
