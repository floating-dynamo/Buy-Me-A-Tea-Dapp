import React, { useState } from "react";
import "./Buy.css";
import { ethers } from "ethers";

const Buy = ({ state }) => {
  const buyTea = async (e) => {
    e.preventDefault();
    const { contract } = state;
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    console.log(name, message, contract);
    const amount = { value: ethers.utils.parseEther("0.05") };
    const transaction = await contract.buyTea(name, message, amount);
    await transaction.wait();

    console.log("Transaction Done ✅");
  };

  return (
    <form onSubmit={buyTea} className="buy-form">
      <div className="buy-fields">
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Name or @yourtwitter"
          autoComplete="disabled"
        />
      </div>
      <div className="buy-fields">
        <input
          id="message"
          type="text"
          name="message"
          placeholder="Say something nice.."
        />
      </div>
      <button type="submit" className="buy-btn">
        Buy a Tea
      </button>
    </form>
  );
};

export default Buy;
