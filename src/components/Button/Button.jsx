import React from 'react'

export default function Button({btnText, handleClick, value}) {
  return (
    <button value={value} onClick={handleClick}>{btnText}</button>
  )
}
