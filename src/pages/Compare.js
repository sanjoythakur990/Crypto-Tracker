import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import SelectCoins from "../components/Compare/SelectCoins";
import SelectDays from "../components/Coin/SelectDays";
import { getCoinData } from "../functions/getCoinData";
import { coinObject } from "../functions/convertObject";
import { getCoinPrices } from "../functions/getCoinPrices";
import Loader from "../components/Common/Loader";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import { settingChartData } from "../functions/settingChartData";
import LineChart from "../components/Coin/LineChart";
import TogglePriceType from "../components/Coin/PriceType";

function Compare() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({});

  async function handleDaysChange(e) {
    setIsLoading(true);
    setDays(e.target.value);
    const prices1 = await getCoinPrices(crypto1, e.target.value, priceType);
    const prices2 = await getCoinPrices(crypto2, e.target.value, priceType);
    if (prices1.length > 0 && prices2.length > 0) {
      settingChartData(setChartData, prices1, prices2);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData(); // function fetch data of bitcoin and ethereum as they are set as default coins
  }, []);

  async function getData() {
    setIsLoading(true);
    const crypto1Data = await getCoinData(crypto1);
    const crypto2Data = await getCoinData(crypto2);
    if (crypto1Data && crypto2Data) {
      coinObject(setCrypto1Data, crypto1Data);
      coinObject(setCrypto2Data, crypto2Data);
      const prices1 = await getCoinPrices(crypto1, days, priceType);
      const prices2 = await getCoinPrices(crypto2, days, priceType);
      if (prices1.length > 0 && prices2.length > 0) {
        settingChartData(setChartData, prices1, prices2);
        setIsLoading(false);
      }
    }
  }

  async function handleCoinChange(event, isCoin2) {
    setIsLoading(true);
    if (isCoin2) setCrypto2(event.target.value);
    else setCrypto1(event.target.value);
    const coinInfoData = await getCoinData(event.target.value);
    if (coinInfoData) {
      coinObject(isCoin2 ? setCrypto2Data : setCrypto1Data, coinInfoData);

      const prices1 = await getCoinPrices(
        isCoin2 ? crypto1 : event.target.value,
        days,
        priceType
      );
      const prices2 = await getCoinPrices(
        isCoin2 ? event.target.value : crypto2,
        days,
        priceType
      );
      if (prices1.length > 0 && prices2.length > 0) {
        settingChartData(setChartData, prices1, prices2);
        console.log("buooyy yoo ", prices1, prices2);
        setIsLoading(false);
      }
    }
  }

  const handlePriceTypeChange = async  (event, value) => {
    if(!value) return
    setIsLoading(true)
    setPriceType(value);
    const prices1 = await getCoinPrices(crypto1, days, value);
      const prices2 = await getCoinPrices(crypto2, days, value);
      if (prices1.length > 0 && prices2.length > 0) {
        settingChartData(setChartData, prices1, prices2);
        setIsLoading(false);
      }
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="coins-days-flex">
            <SelectCoins
              crypto1={crypto1}
              crypto2={crypto2}
              handleCoinChange={handleCoinChange}
            />
            <SelectDays
              days={days}
              handleDaysChange={handleDaysChange}
              noPTag={true}
            />
          </div>
          <div className="grey-wrapper">
            <List coin={crypto1Data} />
          </div>
          <div className="grey-wrapper">
            <List coin={crypto2Data} />
          </div>
          <div className="grey-wrapper" style={{ padding: "1rem 1rem" }}>
          <TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
            <LineChart
              chartData={chartData}
              priceType={priceType}
              multiAxis={true}
            />
          </div>
          <CoinInfo heading={crypto1Data.name} description={crypto1Data.desc} />
          <CoinInfo heading={crypto2Data.name} description={crypto2Data.desc} />
        </>
      )}
    </div>
  );
}

export default Compare;
