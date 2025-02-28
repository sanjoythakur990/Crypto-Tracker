import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import DehazeRoundedIcon from "@mui/icons-material/DehazeRounded";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <DehazeRoundedIcon className="link" />
      </IconButton>

      <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
        <div className="drawer-div">
          <Link to="/">
            <p className="link">Home</p>
          </Link>
          <Link to="/comapare">
            <p className="link">Compare</p>
          </Link>
          <Link to="/watchlist">
            <p className="link">Watchlist</p>
          </Link>
          <Link to="/dashboard">
            <p className="link">Dashboard</p>
          </Link>
        </div>
      </Drawer>
    </div>
  );
}
