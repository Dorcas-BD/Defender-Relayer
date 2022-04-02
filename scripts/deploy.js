const { ethers } = require("hardhat");
const hre = require("hardhat");

const { DefenderRelayProvider, DefenderRelaySigner } = require("defender-relay-client/lib/ethers");

async function main() {

  const credentials = {
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
  };

  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider, {
    speed: "fast"
  });

  const DefenderRelayer = await hre.ethers.getContractFactory("DefenderRelayer");
  const relayer = await DefenderRelayer.connect(signer).deploy();

  await relayer.deployed();

  console.log("Greeter deployed to:", relayer.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
