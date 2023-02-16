import React, { useEffect, useState } from "react";
import "./Memos.css";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };

    contract && memosMessage();
  }, [contract]);

  if (memos.length === 0) {
    return (
      <>
        <h1 id="memos-title">Transactions</h1>
        <div className="memo">
          <p id="memo-name">Sridhar Maskeri</p>
          <p id="memo-timestamp">02/16/2023, 12:09:23 PM</p>
          <p id="memo-message">Great going!</p>
          <p id="memo-address">0x2135e6956d872a40c25235cb326397a10ce9499f</p>
        </div>
      </>
    );
  }

  return (
    <div className="memos">
      <h1>Transactions</h1>
      {memos.map((memo) => {
        return (
          <div>
            <p>{memo.name}</p>
            <p>{memo.message}</p>
            <p>{memo.from}</p>
            <p>{memo.timestamp}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Memos;
