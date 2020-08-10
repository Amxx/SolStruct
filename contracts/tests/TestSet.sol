pragma solidity >0.5.0 <0.8.0;

import "../libs/LibSet.uint256.sol";

contract TestSet
{
	using LibSet_uint256 for LibSet_uint256.set;

	LibSet_uint256.set internal data;

	constructor() public {}

	function length  (              ) public view returns (uint256         ) { return data.length();         }
	function at      (uint256 _index) public view returns (uint256         ) { return data.at(_index);       }
	function indexOf (uint256 _value) public view returns (uint256         ) { return data.indexOf(_value);  }
	function contains(uint256 _value) public view returns (bool            ) { return data.contains(_value); }
	function content (              ) public view returns (uint256[] memory) { return data.content();        }
	function add     (uint256 _value) public      returns (bool            ) { return data.add(_value);      }
	function remove  (uint256 _value) public      returns (bool            ) { return data.remove(_value);   }
	function clear   (              ) public      returns (bool            ) { return data.clear();          }
}
