pragma solidity ^0.5.0;

library LibMap_bytes32_string
{
	struct map
	{
		bytes32[] keys;
		mapping(bytes32 => uint256) indexes;
		mapping(bytes32 => string) values;
	}

	function length(map storage _map)
	internal view returns (uint256)
	{
		return _map.keys.length;
	}

	function value(map storage _map, bytes32  _key)
	internal view returns (string memory)
	{
		return _map.values[_key];
	}

	function at(map storage _map, uint256 _index)
	internal view returns (bytes32 )
	{
		return _map.keys[_index - 1];
	}

	function entryAt(map storage _map, uint256 _index)
	internal view returns (bytes32 , string memory)
	{
		bytes32  key = at(_map, _index);
		return (key, value(_map, key));
	}

	function indexOf(map storage _map, bytes32  _key)
	internal view returns (uint256)
	{
		return _map.indexes[_key];
	}

	function contains(map storage _map, bytes32  _key)
	internal view returns (bool)
	{
		return indexOf(_map, _key) != 0;
	}

	function keys(map storage _map)
	internal view returns (bytes32[] memory)
	{
		return _map.keys;
	}

	function set(map storage _map, bytes32  _key, string memory _value)
	internal returns (bool)
	{
		if (!contains(_map, _key))
		{
			_map.indexes[_key] = _map.keys.push(_key);
		}
		_map.values[_key] = _value;
		return true;
	}

	function remove(map storage _map, bytes32  _key)
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
			bytes32  swapValue = _map.keys[last - 1];
			_map.keys[i - 1] = swapValue;
			_map.indexes[swapValue] = i;
		}

		delete _map.indexes[_key];
		delete _map.values[_key];
		--_map.keys.length;

		return true;
	}

	function clear(map storage _map)
	internal returns (bool)
	{
		for (uint256 i = 0; i < _map.keys.length; ++i)
		{
			delete _map.indexes[_map.keys[i]];
			delete _map.values[_map.keys[i]];
		}
		_map.keys.length = 0;
	}
}
