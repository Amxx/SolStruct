var LibSet_uint256 = artifacts.require('LibSet_uint256')
var TestSet        = artifacts.require('TestSet')

module.exports = async function(deployer, network, accounts)
{
	console.log('# web3 version:', web3.version);
	chainid   = await web3.eth.net.getId();
	chaintype = await web3.eth.net.getNetworkType();
	console.log('Chainid is:', chainid);
	console.log('Chaintype is:', chaintype);

	await deployer.deploy(LibSet_uint256);
	await deployer.link(LibSet_uint256, TestSet);
	await deployer.deploy(TestSet);
};
