import React from 'react'

function Button({
    children,
    type="button",
    bgColor = "#2563eb",  
    textColor = "#ffffff", 
    className="",
    ...props
}) {
  return (
    <button className={`btn ${className}`} style={{color:textColor,backgroundColor:bgColor}} type={type} {...props}>{children}</button>
  )
}

export default Button