pragma solidity ^0.5.0;


contract Migrations
{
	uint256 public lastCompletedMigration;

	constructor()
	public
	{
	}

	function setCompleted(uint completed) public
	{
		lastCompletedMigration = completed;
	}

	function upgrade(address newAddress) public
	{
		Migrations upgraded = Migrations(newAddress);
		upgraded.setCompleted(lastCompletedMigration);
	}
}
