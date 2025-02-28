import React from "react";
import "./styles.css";
import NavigationOutlinedIcon from "@mui/icons-material/NavigationOutlined";
import NavigationIcon from "@mui/icons-material/Navigation";

function BackToTop() {
  // Get the button:
  let mybutton = document.getElementById("myBtn");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      mybutton.style.display = "flex";
    } else {
      mybutton.style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  return (
    <>
      <div className="back-to-top" id="myBtn" onClick={() => topFunction()}>
        <NavigationOutlinedIcon className="outlined" style={{ color: "var(--blue)" }} />
        <NavigationIcon className="filled" style={{ color: "var(--blue)" }} />
      </div>
      {/* <div className="back-to-top" id="myBtn" onClick={() => topFunction()}>
        <NavigationIcon style={{ color: "var(--blue)" }} />
      </div> */}
    </>
  );
}

export default BackToTop;
