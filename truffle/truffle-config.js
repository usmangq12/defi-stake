// truffle-config.js
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      deploymentPollingInterval: 10,
      gas: 6721975, // Increase if needed
      gasPrice: 20000000000,
    },
  },
};

// networks: {
//   develop: {
//     host: '127.0.0.1',
//     port: 7545,
//     chainId: 1337,
//     network_id: 1337,
//     deploymentPollingInterval: 10,
//   },
// },
