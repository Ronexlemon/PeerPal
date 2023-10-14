const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const PeerPalContract = await ethers.getContractFactory("PeerPal");
  
  // Deploy the contract
  const PeerPalContractDeploy = await PeerPalContract.deploy();
  
  // Wait for deployment to complete and get the deployed contract instance
  await PeerPalContractDeploy.deployed();
  
  // Log the contract address
  console.log("PeerPalContractAddress", PeerPalContractDeploy);
}

// Call the main function and handle errors
main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
