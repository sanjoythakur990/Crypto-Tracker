import React, { useEffect, useState } from "react";
import "./styles.css";
import { MenuItem, Select } from "@mui/material";
import { get100Coins } from "../../../functions/get100Coins";

function SelectCoins({crypto1, crypto2, handleCoinChange}) {
  
  const [allCoins, setAllCoins] = useState([])
  const style = {
    height: "2.5rem",
    color: "var(--white)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--white)",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--white)",
    },
    "&:hover": {
      "&& fieldset": {
        borderColor: "#3a80e9",
      },
    },
  }

  useEffect(()=>{
    getCoins()
  }, [])

  async function getCoins(){
    const coins = await get100Coins()
    setAllCoins(coins)
  }

  return (
    <div className="coins-flex">
      <p>Crypto 1</p>
      <Select
        sx={style}
        value={crypto1}
        label="Crypto 1"
        onChange={(e) => handleCoinChange(e, false)}
      >
        {allCoins
        .filter(coin => coin.id !== crypto2)
        .map((coin, i) => <MenuItem key={i} value={coin.id}>{coin.name}</MenuItem>)}
      </Select>

      <p>Crypto 2</p>
      <Select
        sx={style}
        value={crypto2}
        label="Crypto 2"
        onChange={(e) => handleCoinChange(e, true)}
      >
        {allCoins
        .filter(coin => coin.id !== crypto1)
        .map((coin, i) => <MenuItem key={i} value={coin.id}>{coin.name}</MenuItem>)}
      </Select>
    </div>
  );
}

export default SelectCoins;
