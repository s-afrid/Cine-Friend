const back = document.getElementById("back");
const info = document.getElementById("info");
const close = document.getElementById("close");
const infopage = document.getElementById("movieinfo");
const movieanalysis = document.getElementById("movieanalysis");

async function main() {
  back.addEventListener("click", () => {
    window.location.href = "/";
  });

  if (info) {
    info.addEventListener("click", () => {
      infopage.style.left = "0";
      movieanalysis.style.opacity = "0.1"
    });
  }

  if (close) {
    close.addEventListener("click", () => {
      infopage.style.left = "-100%";
      movieanalysis.style.opacity = "1";
    });
  }
}

window.addEventListener("DOMContentLoaded", main);
