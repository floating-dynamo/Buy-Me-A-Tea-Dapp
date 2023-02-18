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
        <h1>No Transactions</h1>
      </>
    );
  }

  return (
    <div className="memos">
      <h1 id="memos-title">Transactions</h1>
      {memos.map((memo) => {
        return (
          <div class='memo' key={Math.random()}>
            <p id='memo-name'>{memo.name}</p>
            <p id='memo-timestamp'>{new Date(memo.timestamp * 1000).toLocaleString()}</p>
            <p id="memo-message">{memo.message}</p>
            <p id="memo-address">{memo.from}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Memos;
