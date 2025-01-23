import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import { coinObject } from "../functions/convertObject";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";

function CoinPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
    const [coinData, setCoinData] = useState()

  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        coinObject(setCoinData, json)
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);
  return <div>
    <Header />
    {isLoading ? <Loader /> : 
    <>
    <div className="grey-wrapper coin-list-view"><List coin={coinData} /></div>
    <CoinInfo heading={coinData.name} description={coinData.desc} />
    </>}
  </div>;
}

export default CoinPage;
