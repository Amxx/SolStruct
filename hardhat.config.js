require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-solhint");
require("solidity-coverage");
require("hardhat-gas-reporter");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.1",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
