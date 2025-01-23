import React from "react";
import "./styles.css";
import { useState } from "react";
function CoinInfo({ heading, description }) {
  const shortDesc =
    description.slice(0, 350) +
    "<p style='color: var(--grey); cursor: pointer;'> Read More...</p>";
  const longDesc = description + "<p style='color: var(--grey); cursor: pointer;'> Read Less...</p>";
  const [flag, setFlag] = useState(false);
  return (
    <div className="grey-wrapper">
      <h2 className="coin-info-heading">{heading}</h2>
      {/* <p className='coin-info-desc'>{description}</p> */}
      {description.length > 350 ? (
        <p
          onClick={() => setFlag(!flag)}
          className="coin-info-desc"
          dangerouslySetInnerHTML={{ __html: !flag ? shortDesc : longDesc }}
        />
      ) : (
        <p dangerouslySetInnerHTML={{ __html: description }} />
      )}
    </div>
  );
}

export default CoinInfo;
