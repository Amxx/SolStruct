var TestSet = artifacts.require('TestSet')
var TestMap = artifacts.require('TestMap')

module.exports = async function(deployer, network, accounts)
{
	console.log('# web3 version:', web3.version);
	chainid   = await web3.eth.net.getId();
	chaintype = await web3.eth.net.getNetworkType();
	console.log('Chainid is:', chainid);
	console.log('Chaintype is:', chaintype);

	await deployer.deploy(TestSet);
	await deployer.deploy(TestMap);
};
