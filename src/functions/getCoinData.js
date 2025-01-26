export const getCoinData = (id) => {
  const url = `https://api.coingecko.com/api/v3/coins/${id}`;
  const options = { method: "GET", headers: { accept: "application/json" } };

  const myData = fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      // coinObject(setCoinData, json);
      return json;
    })
    .catch((err) => {
      console.error(err);
    });

  return myData;
};
