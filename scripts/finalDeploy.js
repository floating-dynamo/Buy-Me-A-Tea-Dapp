const hre = require("hardhat");

async function main() {
  const tea = await hre.ethers.getContractFactory("Tea");
  const contract = await tea.deploy(); // Instance of the contract

  await contract.deployed();
  console.log("Address of contract: ", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
