pragma solidity >0.5.0 <0.7.0;

import './LibSet.uint256.sol';

library LibMap_uint256_string
{
	using LibSet_uint256 for LibSet_uint256.set;

	struct map
	{
		LibSet_uint256.set keyset;
		mapping(uint256 => string) values;
	}

	function length(map storage _map)
	internal view returns (uint256)
	{
		return _map.keyset.length();
	}

	function value(map storage _map, uint256  _key)
	internal view returns (string memory)
	{
		return _map.values[_key];
	}

	function keyAt(map storage _map, uint256 _index)
	internal view returns (uint256 )
	{
		return _map.keyset.at(_index);
	}

	function at(map storage _map, uint256 _index)
	internal view returns (uint256 , string memory)
	{
		uint256  key = keyAt(_map, _index);
		return (key, value(_map, key));
	}

	function indexOf(map storage _map, uint256  _key)
	internal view returns (uint256)
	{
		return _map.keyset.indexOf(_key);
	}

	function contains(map storage _map, uint256  _key)
	internal view returns (bool)
	{
		return _map.keyset.contains(_key);
	}

	function keys(map storage _map)
	internal view returns (uint256[] memory)
	{
		return _map.keyset.content();
	}

	function set(map storage _map, uint256  _key, string memory _value)
	internal returns (bool)
	{
		_map.keyset.add(_key);
		_map.values[_key] = _value;
		return true;
	}

	function del(map storage _map, uint256  _key)
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
