//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

interface IUltraVerifier {
    function verify(bytes calldata _proof, bytes32[] calldata _publicInputs) external view returns (bool);
}

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract ProofGatedValueSetter {
	// State Variables
	bytes32 public secureValue = "Super Secure";
	IUltraVerifier ultraVerifier;

	// Events: a way to emit log statements from smart contract that can be listened to by external parties
	event SecureValueChange(
		address indexed valueSetter,
		bytes32 newValue
	);

	// Constructor: Called once on contract deployment
	// Check packages/hardhat/deploy/00_deploy_your_contract.ts
	constructor(address ultraVerifierAddress) {
		ultraVerifier = IUltraVerifier(ultraVerifierAddress);
	}

	/**
	 * Function that allows anyone to change the state variable "secureValue" of the contract if they have a proof on knowing 2 non-identical numbers
	 *
	 * @param _newSecureValue (bytes32 memory) - new secureValue to save on the contract
	 * @param _proof (bytes calldata) - noir proof
	 * @param _publicInputs (bytes32[] calldata) - noir public inputs
	 */
	function setSecureValue(bytes32 _newSecureValue, bytes calldata _proof, bytes32[] calldata _publicInputs) public returns (bool){
		// Print data to the hardhat chain console. Remove when deploying to a live network.
		// console.log(
		// 	"Setting new secure value '%s' from %s",
		// 	_newSecureValue,
		// 	msg.sender
		// );

		// check proof
		require(ultraVerifier.verify(_proof, _publicInputs), "Proof verification failed.");
		// ultraVerifier.verify(_proof, _publicInputs);

		// Change state variables
		secureValue = _newSecureValue;

		// emit: keyword used to trigger an event
		emit SecureValueChange(msg.sender, _newSecureValue);

		return(true);
	}
}
