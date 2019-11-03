pragma solidity ^0.5.0;

library LibMap2_bytes4_address_string
{
	struct map
	{
		bytes4[] keys;
		mapping(bytes4 => uint256) indexes;
		mapping(bytes4 => address) values1;
		mapping(bytes4 => string) values2;
	}

	function length(map storage _map)
	internal view returns (uint256)
	{
		return _map.keys.length;
	}

	function value(map storage _map, bytes4  _key)
	internal view returns (address , string memory)
	{
		return (value1(_map, _key), value2(_map, _key));
	}

	function value1(map storage _map, bytes4  _key)
	internal view returns (address )
	{
		return _map.values1[_key];
	}

	function value2(map storage _map, bytes4  _key)
	internal view returns (string memory)
	{
		return _map.values2[_key];
	}

	function at(map storage _map, uint256 _index)
	internal view returns (bytes4 )
	{
		return _map.keys[_index - 1];
	}

	function entryAt(map storage _map, uint256 _index)
	internal view returns (bytes4 , address , string memory)
	{
		bytes4  key = at(_map, _index);
		return (key, value1(_map, key), value2(_map, key));
	}

	function indexOf(map storage _map, bytes4  _key)
	internal view returns (uint256)
	{
		return _map.indexes[_key];
	}

	function contains(map storage _map, bytes4  _key)
	internal view returns (bool)
	{
		return indexOf(_map, _key) != 0;
	}

	function keys(map storage _map)
	internal view returns (bytes4[] memory)
	{
		return _map.keys;
	}

	function set(
		map storage _map,
		bytes4  _key,
		address  _value1,
		string memory _value2)
	internal returns (bool)
	{
		if (!contains(_map, _key))
		{
			_map.indexes[_key] = _map.keys.push(_key);
		}
		_map.values1[_key] = _value1;
		_map.values2[_key] = _value2;
		return true;
	}

	function remove(map storage _map, bytes4  _key)
	internal returns (bool)
	{
		if (!contains(_map, _key))
		{
			return false;
		}

		uint256 i    = indexOf(_map, _key);
		uint256 last = length(_map);

		if (i != last)
		{
			bytes4  swapValue = _map.keys[last - 1];
			_map.keys[i - 1] = swapValue;
			_map.indexes[swapValue] = i;
		}

		delete _map.indexes[_key];
		delete _map.values1[_key];
		delete _map.values2[_key];
		--_map.keys.length;

		return true;
	}

	function clear(map storage _map)
	internal returns (bool)
	{
		for (uint256 i = 0; i < _map.keys.length; ++i)
		{
			delete _map.indexes[_map.keys[i]];
			delete _map.values1[_map.keys[i]];
			delete _map.values2[_map.keys[i]];
		}
		_map.keys.length = 0;
	}
}
