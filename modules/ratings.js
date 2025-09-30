export const getRatings = (data) => {
    let sources = []
    for(let i of data) {
      sources.push(i.Source)
    }
    let ratings = []
    for(let i of data) {
      ratings.push(i.Value)
    }
    
    return [sources,ratings]  
}