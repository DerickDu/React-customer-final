import React from 'react'

const Line = ({ info }) => {
  console.log("here", info)

  return (
    <div><p>{`${info["name"]} ${info["quantity"]} $${Number(info["quantity"]) * Number(info[
      "unitPrice"
    ])}`}</p></div>
  )
}

export default Line