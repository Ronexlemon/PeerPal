const {ethers} = require("hardhat");
async function main() {
    
  
    // const lock = await ethers.deployContract("PeerPal");
  
    // await lock.waitForDeployment();
    // console.log("contractAddress", lock.address);

     //get the contract
     const PeerPalContract = await ethers.getContractFactory("PeerPal");
     //deploy the contract
     const PeerPalContractDeploy = await PeerPalContract.deploy();
     //await deployment
     //await PeerPalContractDeploy.deployed();
     //console the address
     console.log("PeerPalContractAddress", await PeerPalContractDeploy.getAddress());
  
    
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  