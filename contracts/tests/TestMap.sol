pragma solidity >0.5.0 <0.7.0;

import "../libs/LibMap.uint256.string.sol";

contract TestMap
{
	using LibMap_uint256_string for LibMap_uint256_string.map;

	LibMap_uint256_string.map internal data;

	constructor() public {}

	function length  (                                  ) public view returns (uint256               ) { return data.length();          }
	function value   (uint256 _key                      ) public view returns (string memory         ) { return data.value(_key);       }
	function keyAt   (uint256 _index                    ) public view returns (uint256               ) { return data.keyAt(_index);     }
	function at      (uint256 _index                    ) public view returns (uint256, string memory) { return data.at(_index);        }
	function indexOf (uint256 _key                      ) public view returns (uint256               ) { return data.indexOf(_key);     }
	function contains(uint256 _key                      ) public view returns (bool                  ) { return data.contains(_key);    }
	function keys    (                                  ) public view returns (uint256[] memory      ) { return data.keys();            }
	function set     (uint256 _key, string memory _value) public      returns (bool                  ) { return data.set(_key, _value); }
	function del     (uint256 _key                      ) public      returns (bool                  ) { return data.del(_key);         }
	function clear   (                                  ) public      returns (bool                  ) { return data.clear();           }
}
