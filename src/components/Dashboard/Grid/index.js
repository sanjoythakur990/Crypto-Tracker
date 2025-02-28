import React from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { addTowatchcList, removeFromWatchList } from "../../../functions/addToWatchList";

function Grid({ coin, i, setList }) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  const isInWatchlist = (id) => watchlist.includes(id);

  return (
    <Link to={`/coin/${coin.id}`}>
      <div
        className={`grid-container ${
          coin.price_change_percentage_24h < 0 && "grid-container-red"
        }`}
      >
        <div style={{display: "flex", justifyContent: "space-between"}}>
        <div className="info-flex">
          <img src={coin.image} className="coin-logo" alt="coin" />
          <div className="name-col">
            <p className="coin-symbol">{coin.symbol}</p>
            <p className="coin-name">{coin.name}</p>
          </div>
          
        </div>
        <Link to="/watchlist">
        <Tooltip title={isInWatchlist(coin.id) ? "Remove from Watchlist" : "Add to Watchlist"} placement="bottom-start">
        {coin.price_change_percentage_24h > 0 ? (
        <div className="star-icon-green" onClick={() => !isInWatchlist(coin.id) ? addTowatchcList(coin.id) : removeFromWatchList(coin.id, setList)}>
          {!isInWatchlist(coin.id) ?
          <>
            <StarBorderIcon className="star-bordered" style={{ fontSize: "2rem", color: "var(--green)"}}/>
            <StarIcon className="star-filled-x" style={{ fontSize: "2rem", color: "var(--green)"}}/>
            </> :
            
            <StarIcon className="star-filled" style={{ fontSize: "2rem", color: "var(--green)"}}/>
            
            }
            
          </div>
        ) : (
          <div className="star-icon-red" onClick={() => !isInWatchlist(coin.id) ? addTowatchcList(coin.id) : removeFromWatchList(coin.id, setList)}>
            {!isInWatchlist(coin.id) ?
            <>
            <StarBorderIcon className="star-bordered" style={{ fontSize: "2rem", color: "var(--red)"}}/>
            <StarIcon className="star-filled-x" style={{ fontSize: "2rem", color: "var(--red)"}}/>
            </> :
            <StarIcon className="star-filled" style={{ fontSize: "2rem", color: "var(--red)"}}/>}
          </div>
        )}
        </Tooltip>
        </Link>
          </div>
          

        {coin.price_change_percentage_24h > 0 ? (
          <div className="chip-flex">
            <div className="price-chip">
              {coin.price_change_percentage_24h.toFixed(2)} %
            </div>
            <div className="icon-chip">
              <TrendingUpRoundedIcon />
            </div>
          </div>
        ) : (
          <div className="chip-flex">
            <div className="price-chip chip-red">
              {coin.price_change_percentage_24h.toFixed(2)} %
            </div>
            <div className="icon-chip chip-red">
              <TrendingDownRoundedIcon />
            </div>
          </div>
        )}
        <div className="info-container">
          <h3
            className="coin-price"
            style={{
              color:
                coin.price_change_percentage_24h > 0
                  ? "var(--green)"
                  : "var(--red)",
            }}
          >
            ${coin.current_price.toLocaleString()}
          </h3>
          <p className="total-volume">
            Total Volume : ${coin.total_volume.toLocaleString()}
          </p>
          <p className="market-cap">
            Market Cap : ${coin.market_cap.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Grid;
