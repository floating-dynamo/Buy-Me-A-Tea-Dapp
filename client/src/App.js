import { useState, useEffect } from "react";
import abi from "./contracts/Tea.json";
import "./App.css";
import Buy from "./components/Buy";
import Memos from "./components/Memos";

const ethers = require("ethers");

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x20254fCfaD54b612659742b1654D8341bD2fb9BD";
      const contractAbi = abi.abi;
      try {
        const { ethereum } = window; // Using Metamask

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          }); // Auto opens Meta mask wallet when we visit the site
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
          );
          setState({ provider, signer, contract });
          setAccount(account);
        } else {
          return alert("Please Install Metamask");
        }
      } catch (err) {
        console.log(err);
      }
    };
    connectWallet();
  }, []);

  console.log(state);

  return (
    <div className="App">
      <h1 className="app-title">Buy Sridhar Maskeri A Tea ☕</h1>
      <p className="app-account-title"><div className={account!=='None'?"acc-connected":"acc-disconnected"} /> Connected Account - {account}</p>
      <Buy state={state}/>
      <Memos/>
    </div>
  );
}

export default App;
