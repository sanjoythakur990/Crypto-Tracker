export const get100Coins = () => {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc";
  const options = { method: "GET", headers: { accept: "application/json" } };

  const myCoins = fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
        return json
    })
    .catch((err) => {
      console.error(err);
    });
    return myCoins
};
