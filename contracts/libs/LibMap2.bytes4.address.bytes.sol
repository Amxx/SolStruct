pragma solidity >0.5.0 <0.7.0;

import './LibSet.bytes4.sol';

library LibMap2_bytes4_address_bytes
{
	using LibSet_bytes4 for LibSet_bytes4.set;

	struct map
	{
		LibSet_bytes4.set keyset;
		mapping(bytes4 => address) values1;
		mapping(bytes4 => bytes) values2;
	}

	function length(map storage _map)
	internal view returns (uint256)
	{
		return _map.keyset.length();
	}

	function value1(map storage _map, bytes4  _key)
	internal view returns (address )
	{
		return _map.values1[_key];
	}

	function value2(map storage _map, bytes4  _key)
	internal view returns (bytes memory)
	{
		return _map.values2[_key];
	}

	function keyAt(map storage _map, uint256 _index)
	internal view returns (bytes4 )
	{
		return _map.keyset.at(_index);
	}

	function at(map storage _map, uint256 _index)
	internal view returns (bytes4 , address , bytes memory)
	{
		bytes4  key = keyAt(_map, _index);
		return (key, value1(_map, key), value2(_map, key));
	}

	function indexOf(map storage _map, bytes4  _key)
	internal view returns (uint256)
	{
		return _map.keyset.indexOf(_key);
	}

	function contains(map storage _map, bytes4  _key)
	internal view returns (bool)
	{
		return _map.keyset.contains(_key);
	}

	function keys(map storage _map)
	internal view returns (bytes4[] memory)
	{
		return _map.keyset.content();
	}

	function set(
		map storage _map,
		bytes4  _key,
		address  _value1,
		bytes memory _value2)
	internal returns (bool)
	{
		_map.keyset.add(_key);
		_map.values1[_key] = _value1;
		_map.values2[_key] = _value2;
		return true;
	}

	function del(map storage _map, bytes4  _key)
	internal returns (bool)
	{
		_map.keyset.remove(_key);
		delete _map.values1[_key];
		delete _map.values2[_key];
		return true;
	}

	function clear(map storage _map)
	internal returns (bool)
	{
		for (uint256 i = _map.keyset.length(); i > 0; --i)
		{
			bytes4  key = keyAt(_map, i-1);
			delete _map.values1[key];
			delete _map.values2[key];
		}
		_map.keyset.clear();
		return true;
	}
}
