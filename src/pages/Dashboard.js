import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import Search from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/PaginationComponent";
import Loader from "../components/Common/Loader";
import BackToTop from "../components/Common/BackToTop";

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = (value - 1) * 10;
    setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
  };
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  var filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );
  // const coins = [
  //   {
  //     "id": "bitcoin",
  //     "symbol": "btc",
  //     "name": "Bitcoin",
  //     "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
  //     "current_price": 70187,
  //     "market_cap": 1381651251183,
  //     "market_cap_rank": 1,
  //     "fully_diluted_valuation": 1474623675796,
  //     "total_volume": 20154184933,
  //     "high_24h": 70215,
  //     "low_24h": 68060,
  //     "price_change_24h": 2126.88,
  //     "price_change_percentage_24h": 3.12502,
  //     "market_cap_change_24h": 44287678051,
  //     "market_cap_change_percentage_24h": 3.31157,
  //     "circulating_supply": 19675987,
  //     "total_supply": 21000000,
  //     "max_supply": 21000000,
  //     "ath": 73738,
  //     "ath_change_percentage": -4.77063,
  //     "ath_date": "2024-03-14T07:10:36.635Z",
  //     "atl": 67.81,
  //     "atl_change_percentage": 103455.83335,
  //     "atl_date": "2013-07-06T00:00:00.000Z",
  //     "roi": null,
  //     "last_updated": "2024-04-07T16:49:31.736Z"
  //   },
  //   {
  //     ath: 4878.26,
  //     ath_change_percentage: -32.84888,
  //     ath_date: "2021-11-10T14:24:19.604Z",
  //     atl: 0.432979,
  //     atl_change_percentage: 756474.26684,
  //     atl_date: "2015-10-20T00:00:00.000Z",
  //     circulating_supply: 120502277.5509541,
  //     current_price: 3314.56,
  //     fully_diluted_valuation: 399185191431,
  //     high_24h: 3517.47,
  //     id: "ethereum",
  //     image: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
  //     last_updated: "2025-01-18T11:51:32.650Z",
  //     low_24h: 3238.04,
  //     market_cap: 399185191431,
  //     market_cap_change_24h: -13820135550.418518,
  //     market_cap_change_percentage_24h: -3.34624,
  //     market_cap_rank: 2,
  //     max_supply: null,
  //     name: "Ethereum",
  //     price_change_24h: -110.67491508636067,
  //     price_change_percentage_24h: -3.23116,
  //     roi: {
  //       times: 41.74349021347934,
  //       currency: 'btc',
  //       percentage: 4174.3490213479345
  //     },
  //     symbol: "eth",
  //     total_supply: 120502277.5509541,
  //     total_volume: 28946301936
  //   }
  // ]
  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc";
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setCoins(json);
        setPaginatedCoins(json.slice(0, 10));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);
  console.log("COIN => ", coins);
  return (
    <>
      
      <Header />
      <BackToTop />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Search search={search} onSearchChange={onSearchChange} />
          <TabsComponent coins={search ? filteredCoins : paginatedCoins} />
          {!search && (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Dashboard;
