import React from "react";
import Header from "../components/Common/Header";
import { Link } from "react-router-dom";
import Button from "../components/Common/Button";

function WatchList() {
  return (
    <div>
      <Header />
      {!localStorage.getItem("watchlist") && (
        <div className="watchlist-items">
          <h3 style={{ fontSize: "2rem" }}>No items in the WatchList</h3>
          <Link to="/dashboard">
            <Button
              text={"Dashboard"}
              onClick={() => console.log("btn clicked")}
            />
          </Link>
        </div>
      )}
    </div>
  );
}

export default WatchList;
