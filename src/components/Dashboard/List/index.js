import React from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Tooltip } from "@mui/material";
import { convertNumber } from "../../../functions/convertNumber";
import { Link } from "react-router-dom";
import { addTowatchcList, removeFromWatchList } from "../../../functions/addToWatchList";

function List({ coin, setList }) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  const isInWatchlist = (id) => watchlist.includes(id);
  return (
    <Link to={`/coin/${coin.id}`}>
      <tr className="list-row">
        <Tooltip title="Coin Logo">
          <td className="td-img">
            <img src={coin.image} className="coin-logo" alt="coin" />
          </td>
        </Tooltip>
        <Tooltip title="Coin Info" placement="bottom-start">
          <td>
            <div className="name-col">
              <p className="coin-symbol">{coin.symbol}</p>
              <p className="coin-name">{coin.name}</p>
            </div>
          </td>
        </Tooltip>
        <Tooltip title="Price Change in 24hrs" placement="bottom-start">
          {coin.price_change_percentage_24h > 0 ? (
            <td className="chip-flex">
              <div className="price-chip">
                {coin.price_change_percentage_24h.toFixed(2)} %
              </div>
              <div className="icon-chip td-icon">
                <TrendingUpRoundedIcon />
              </div>
            </td>
          ) : (
            <td className="chip-flex">
              <div className="price-chip chip-red">
                {coin.price_change_percentage_24h.toFixed(2)} %
              </div>
              <div className="icon-chip chip-red td-icon">
                <TrendingDownRoundedIcon />
              </div>
            </td>
          )}
        </Tooltip>
        <Tooltip title="Current Price">
          <td>
            <h3
              className="coin-price td-center-align"
              style={{
                color:
                  coin.price_change_percentage_24h > 0
                    ? "var(--green)"
                    : "var(--red)",
              }}
            >
              ${coin.current_price.toLocaleString()}
            </h3>
          </td>
        </Tooltip>
        <Tooltip title="Total Volume" placement="bottom-start">
          <td className="total-volume td-right-align">
            ${coin.total_volume.toLocaleString()}
          </td>
        </Tooltip>
        <Tooltip title="Market Cap" placement="bottom-start">
          <td className="market-cap td-right-align desktop-market-cap">
            ${coin.market_cap.toLocaleString()}
          </td>
        </Tooltip>
        <Tooltip title="Market Cap" placement="bottom-start">
          <td className="market-cap td-right-align mobile-market-cap">
            ${convertNumber(coin.market_cap)}
          </td>
        </Tooltip>
        <Link to="/watchlist">
        <Tooltip title={isInWatchlist(coin.id) ? "Remove from Watchlist" : "Add to Watchlist"} placement="bottom-start">
        {coin.price_change_percentage_24h > 0 ? (
        <td className="star-icon-green" onClick={() => !isInWatchlist(coin.id) ? addTowatchcList(coin.id) : removeFromWatchList(coin.id, setList)}>
            {!isInWatchlist(coin.id) ?
          <>
            <StarBorderIcon className="star-bordered" style={{ fontSize: "2rem", color: "var(--green)"}}/>
            <StarIcon className="star-filled-x" style={{ fontSize: "2rem", color: "var(--green)"}}/>
            </> :
            
            <StarIcon className="star-filled" style={{ fontSize: "2rem", color: "var(--green)"}}/>
            
            }
          </td>
        ) : (
          <td className="star-icon-red" onClick={() => !isInWatchlist(coin.id) ? addTowatchcList(coin.id) : removeFromWatchList(coin.id, setList)}>
            {!isInWatchlist(coin.id) ?
            <>
            <StarBorderIcon className="star-bordered" style={{ fontSize: "2rem", color: "var(--red)"}}/>
            <StarIcon className="star-filled-x" style={{ fontSize: "2rem", color: "var(--red)"}}/>
            </> :
            <StarIcon className="star-filled" style={{ fontSize: "2rem", color: "var(--red)"}}/>}
          </td>
        )}
        </Tooltip>
        </Link>
      </tr>
    </Link>
  );
}

export default List;
