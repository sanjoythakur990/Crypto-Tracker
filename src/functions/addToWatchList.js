export const addTowatchcList = (coinId) =>{
    if(!localStorage.getItem("watchlist")){
        let watchlist =[];
        watchlist.push(coinId)
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
    }
    else{
        let watchlist = JSON.parse(localStorage.getItem("watchlist"))
        watchlist.push(coinId)
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
    }
}