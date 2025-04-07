// migrations/2_deploy_contracts.js
const Staking = artifacts.require("Staking");

module.exports = function (deployer) {
  deployer.deploy(Staking);
};
