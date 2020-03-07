pragma solidity >0.5.0 <0.7.0;

import './LibSet.bytes32.sol';

library LibMap_bytes32_bytes
{
	using LibSet_bytes32 for LibSet_bytes32.set;

	struct map
	{
		LibSet_bytes32.set keys;
		mapping(bytes32 => bytes) values;
	}

	function length(map storage _map)
	internal view returns (uint256)
	{
		return _map.keys.length();
	}

	function value(map storage _map, bytes32  _key)
	internal view returns (bytes memory)
	{
		return _map.values[_key];
	}

	function keyAt(map storage _map, uint256 _index)
	internal view returns (bytes32 )
	{
		return _map.keys.at(_index);
	}

	function at(map storage _map, uint256 _index)
	internal view returns (bytes32 , bytes memory)
	{
		bytes32  key = keyAt(_map, _index);
		return (key, value(_map, key));
	}

	function indexOf(map storage _map, bytes32  _key)
	internal view returns (uint256)
	{
		return _map.keys.indexOf(_key);
	}

	function contains(map storage _map, bytes32  _key)
	internal view returns (bool)
	{
		return _map.keys.contains(_key);
	}

	function keys(map storage _map)
	internal view returns (bytes32[] memory)
	{
		return _map.keys.content();
	}

	function set(map storage _map, bytes32  _key, bytes memory _value)
	internal returns (bool)
	{
		_map.keys.add(_key);
		_map.values[_key] = _value;
		return true;
	}

	function del(map storage _map, bytes32  _key)
	internal returns (bool)
	{
		_map.keys.remove(_key);
		delete _map.values[_key];
		return true;
	}

	function clear(map storage _map)
	internal returns (bool)
	{
		for (uint256 i = _map.keys.length(); i > 0; --i)
		{
			delete _map.values[keyAt(_map, i-1)];
		}
		_map.keys.clear();
	}
}
