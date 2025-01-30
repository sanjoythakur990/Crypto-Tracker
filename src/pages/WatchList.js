import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import { Link } from "react-router-dom";
import Button from "../components/Common/Button";
import TabsComponent from "../components/Dashboard/Tabs";
import { get100Coins } from "../functions/get100Coins";
import Loader from "../components/Common/Loader";

function WatchList() {
  const [coins, setCoins] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if(localStorage.getItem("watchlist") && JSON.parse(localStorage.getItem("watchlist")).length > 0 ){
      console.log(localStorage.getItem("watchlist"));
      getCoins()
    }
  }, []);

  const getCoins = async () => {
    const allCoins = await get100Coins();
    const watchlist = JSON.parse(localStorage.getItem("watchlist"))
    let filteredCoins = allCoins.filter(coin => watchlist.includes(coin.id));
    setCoins(filteredCoins);
    // setPaginatedCoins(allCoins.slice(0, 10));
    setIsLoading(false);
  }
  return (
    <div>
      <Header />
      {!localStorage.getItem("watchlist") ? (
        <div className="watchlist-items">
          <h3 style={{ fontSize: "2rem" }}>No items in the WatchList</h3>
          <Link to="/dashboard">
            <Button
              text={"Dashboard"}
              onClick={() => console.log("btn clicked")}
            />
          </Link>
        </div>
      ) :
      JSON.parse(localStorage.getItem("watchlist")).length === 0 ? (
        <div className="watchlist-items">
          <h3 style={{ fontSize: "2rem" }}>No items in the WatchList</h3>
          <Link to="/dashboard">
            <Button
              text={"Dashboard"}
              onClick={() => console.log("btn clicked")}
            />
          </Link>
        </div>
      ) :
      (isLoading ? <Loader /> :
        <div>
          <TabsComponent coins={coins} />
        </div>
)}
    </div>
  );
}

export default WatchList;
