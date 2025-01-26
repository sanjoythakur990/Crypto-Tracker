import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import { coinObject } from "../functions/convertObject";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import axios from "axios";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import LineChart from "../components/Coin/LineChart";
import { convertDate } from "../functions/convertDate";
import SelectDays from "../components/Coin/SelectDays";
import { settingChartData } from "../functions/settingChartData";
import TogglePriceType from "../components/Coin/PriceType";

function CoinPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState();
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({});
  const [priceType, setPriceType] = useState("prices");

  const handlePriceTypeChange = async  (event, value) => {
    if(!value) return
    setIsLoading(true)
    setPriceType(value);
    const prices = await getCoinPrices(id, days, value);
      if (prices.length > 0) {
        settingChartData(setChartData, prices)
        setIsLoading(false);
      }
  };

  async function handleDaysChange(event) {
    setIsLoading(true)
    setDays(event.target.value)
    const prices = await getCoinPrices(id, event.target.value, priceType);
      if (prices.length > 0) {
        settingChartData(setChartData, prices)
        setIsLoading(false);
      }
  }

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  async function getData() {
    const coinInfoData = await getCoinData(id);
    if (coinInfoData) {
      coinObject(setCoinData, coinInfoData);
      const prices = await getCoinPrices(id, days, priceType);
      if (prices.length > 0) {
        settingChartData(setChartData, prices)
        setIsLoading(false);
      }
    }
  }

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grey-wrapper">
            <List coin={coinData} />
          </div>
          <div className="grey-wrapper" style={{padding: "1rem 1rem"}}>
            <SelectDays days={days} handleDaysChange={handleDaysChange}/>
            <TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
            <LineChart chartData={chartData} priceType={priceType} />
          </div>
          <CoinInfo heading={coinData.name} description={coinData.desc} />
        </>
      )}
    </div>
  );
}

export default CoinPage;
