pragma solidity >0.5.0 <0.7.0;

import './LibSet.bytes4.sol';

library LibMap_bytes4_address
{
	using LibSet_bytes4 for LibSet_bytes4.set;

	struct map
	{
		LibSet_bytes4.set keys;
		mapping(bytes4 => address) values;
	}

	function length(map storage _map)
	internal view returns (uint256)
	{
		return _map.keys.length();
	}

	function value(map storage _map, bytes4  _key)
	internal view returns (address )
	{
		return _map.values[_key];
	}

	function keyAt(map storage _map, uint256 _index)
	internal view returns (bytes4 )
	{
		return _map.keys.at(_index);
	}

	function at(map storage _map, uint256 _index)
	internal view returns (bytes4 , address )
	{
		bytes4  key = keyAt(_map, _index);
		return (key, value(_map, key));
	}

	function indexOf(map storage _map, bytes4  _key)
	internal view returns (uint256)
	{
		return _map.keys.indexOf(_key);
	}

	function contains(map storage _map, bytes4  _key)
	internal view returns (bool)
	{
		return _map.keys.contains(_key);
	}

	function keys(map storage _map)
	internal view returns (bytes4[] memory)
	{
		return _map.keys.content();
	}

	function set(map storage _map, bytes4  _key, address  _value)
	internal returns (bool)
	{
		_map.keys.add(_key);
		_map.values[_key] = _value;
		return true;
	}

	function del(map storage _map, bytes4  _key)
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
