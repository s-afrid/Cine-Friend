let movie_name = document.getElementById("movie_name")
let analyse = document.getElementById("analyse")


function sendName() {
    analyse.addEventListener("click",async (e)=>{
        let a = await fetch('/',{method: "POST",
            headers: {
                'Content-Type': 'text/plain',
            },
            body: movie_name.value
        })
        let b = await a.text()
        console.log(b)
        
    })
}

async function main() {
    sendName();
}

main()