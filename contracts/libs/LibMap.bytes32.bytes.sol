// SPDX-License-Identifier: MIT

pragma solidity >0.5.0 <0.9.0;

import './LibSet.bytes32.sol';

library LibMap_bytes32_bytes
{
	using LibSet_bytes32 for LibSet_bytes32.set;

	struct map
	{
		LibSet_bytes32.set keyset;
		mapping(bytes32 => bytes) values;
	}

	function length(map storage _map)
	internal view returns (uint256)
	{
		return _map.keyset.length();
	}

	function tryGet(map storage _map, bytes32  _key)
	internal view returns (bool, bytes memory)
	{
		return (contains(_map, _key), _map.values[_key]);
	}

	function get(map storage _map, bytes32  _key)
	internal view returns (bytes memory)
	{
		require(contains(_map, _key), "LibMap_bytes32_bytes: key not found");
		return _map.values[_key];
	}

	function keyAt(map storage _map, uint256 _index)
	internal view returns (bytes32 )
	{
		return _map.keyset.at(_index);
	}

	function at(map storage _map, uint256 _index)
	internal view returns (bytes32 , bytes memory)
	{
		bytes32  key = keyAt(_map, _index);
		return (key, _map.values[key]);
	}

	function indexOf(map storage _map, bytes32  _key)
	internal view returns (uint256)
	{
		return _map.keyset.indexOf(_key);
	}

	function contains(map storage _map, bytes32  _key)
	internal view returns (bool)
	{
		return _map.keyset.contains(_key);
	}

	function keys(map storage _map)
	internal view returns (bytes32[] memory)
	{
		return _map.keyset.content();
	}

	function set(map storage _map, bytes32  _key, bytes memory _value)
	internal returns (bool)
	{
		_map.keyset.add(_key);
		_map.values[_key] = _value;
		return true;
	}

	function del(map storage _map, bytes32  _key)
	internal returns (bool)
	{
		_map.keyset.remove(_key);
		delete _map.values[_key];
		return true;
	}

	function clear(map storage _map)
	internal returns (bool)
	{
		for (uint256 i = _map.keyset.length(); i > 0; --i)
		{
			delete _map.values[keyAt(_map, i)];
		}
		_map.keyset.clear();
		return true;
	}
}
