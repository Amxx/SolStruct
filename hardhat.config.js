require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-solhint");
require("solidity-coverage");
require("hardhat-gas-reporter");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    // version: "0.5.17",
    // version: "0.6.12",
    // version: "0.7.6",
    // version: "0.8.1",
    version: process.env.SOLC_VERSION ?? "0.8.1",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
