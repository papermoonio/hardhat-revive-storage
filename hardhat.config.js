require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");

require("hardhat-resolc");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      polkavm: true,
      nodeConfig: {
        nodeBinaryPath: '../../../code/polkadot-sdk/target/debug/substrate-node',
        rpcPort: 8000,
        dev: true,
      },
      adapterConfig: {
        adapterBinaryPath: '../../../code/polkadot-sdk/target/debug/eth-rpc',
        dev: true,
      },
      allowUnlimitedContractSize: true,
    },
    polkavm: {
      // gas: "auto",
      // gasPrice: "auto",
      blockGasLimit: 3000000000,
      // hardfork: "london",      
      polkavm: true,
      url: 'http://127.0.0.1:8545',
      accounts: [process.env.LOCAL_PRIV_KEY, process.env.AH_PRIV_KEY],
      timeout: 1000000,
      initialBaseFeePerGas: 0,
    },
    ah: { 
        url: "https://westend-asset-hub-eth-rpc.polkadot.io",
        accounts: [process.env.AH_PRIV_KEY, process.env.LOCAL_PRIV_KEY],
     },
  },

  // using remix compiler
  resolc: {
    version: "1.5.2",
    compilerSource: "remix",
    settings: {
      optimizer: {
        enabled: false,
        runs: 600,
      },
      evmVersion: "istanbul",
    },
  },
  
  // using binary compiler
  // resolc: {
  //   compilerSource: 'binary',
  //   settings: {
  //     optimizer: {
  //       enabled: true,
  //       runs: 400,
  //     },
  //     evmVersion: 'istanbul',
  //     compilerPath: '~/.cargo/bin/resolc',
  //     standardJson: true,
  //   },
  // },
};
