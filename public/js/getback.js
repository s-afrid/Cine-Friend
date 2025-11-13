const back = document.getElementById("back");
const info = document.getElementById("info");
async function main() {
    back.addEventListener("click",(e)=>{
        window.location.href = '/'
    })

    if (info) {
    info.addEventListener("click", () => {
      const infopage = document.getElementById("movieinfo");
      infopage.style.left = "0px";
    });
  }
}
main()