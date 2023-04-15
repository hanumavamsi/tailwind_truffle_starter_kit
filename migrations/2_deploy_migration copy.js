const ISTENFT = artifacts.require('ISTENFT')

module.exports = async (deployer) => {
  const accounts = await web3.eth.getAccounts()

  await deployer.deploy(ISTENFT, 'ISTE NFTs', 'ISTE', 10, accounts[1])
}