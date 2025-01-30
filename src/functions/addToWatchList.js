import { toast } from "react-toastify";

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
    toast.success("Added to Watchlist")
}

export const removeFromWatchList = (coinId) =>{
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    // Filter out the coin instead of using splice
    watchlist = watchlist.filter(id => id !== coinId);
        console.log("watchlist ", watchlist);
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
        
        toast.success("Removed from Watchlist")
        setTimeout(() => {
            window.location.reload();
        }, 1000);
}