require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path: ".env"});
const PRIVATEKEY = process.env.PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.21",
  networks: {
    scrollSepolia: {
      url: `https://1rpc.io/scroll/sepolia`,
      accounts:[PRIVATEKEY],
      chainId: 534351,
        
    },
  },
  etherscan: {
    apiKey: {
      scrollSepolia: 'abc',
    },
    customChains: [
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://sepolia-blockscout.scroll.io/api',
          browserURL: 'https://sepolia-blockscout.scroll.io/',
        },
      },
    ],
  },
};
