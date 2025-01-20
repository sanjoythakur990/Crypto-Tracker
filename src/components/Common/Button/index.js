import React from 'react'
import "./styles.css"
function Button({text, onClick, outline}) {
  return (
    <div className={outline ? 'outlined-btn' : 'btn'} onClick={()=> onClick()}>{text}</div>
  )
}

export default Button