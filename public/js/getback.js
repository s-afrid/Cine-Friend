const back = document.getElementById("back");
const info = document.getElementById("info");
const close = document.getElementById("close");
const infopage = document.getElementById("movieinfo");
const movieanalysis = document.getElementById("movieanalysis")
async function main() {
    back.addEventListener("click",(e)=>{
        window.location.href = '/'
    })

    if (info) {
    info.addEventListener("click", () => {
      
      infopage.style.left = "0px";
      movieanalysis.style.filter = "blur(10px)";
    });
  }

  close.addEventListener("click",()=>{
    
      infopage.style.left = "-100%";
      movieanalysis.style.filter = "none";
  })

}
main()