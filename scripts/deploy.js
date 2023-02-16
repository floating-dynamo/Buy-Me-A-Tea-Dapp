const hre = require("hardhat");

async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);

  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance`, await getBalances(address));
    counter++;
  }
}

async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp}, name ${name}, address ${from}, message ${message}`
    );
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners(); // Provides 1000ETH test for each person
  const tea = await hre.ethers.getContractFactory("Tea");
  const contract = await tea.deploy(); // Instance of the contract

  await contract.deployed();
  console.log("Address of contract: ", contract.address);

  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];
  console.log("Before Buying the Tea");
  await consoleBalances(addresses);

  const amount = { value: hre.ethers.utils.parseEther("1") }; // 1 ETH
  await contract.connect(from1).buyTea("From 1", "Great person!", amount);
  await contract.connect(from2).buyTea("From 2", "Great man!", amount);
  await contract.connect(from3).buyTea("From 3", "Great boii!", amount);

  console.log("After Buying the Tea");
  await consoleBalances(addresses);

  const memos = await contract.getMemos();
  consoleMemos(memos);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
