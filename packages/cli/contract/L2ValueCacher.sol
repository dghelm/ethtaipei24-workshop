//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IScrollChainCommitmentVerifier {
	function verifyStateCommitment(uint256 batchIndex, address account, bytes32 storageKey, bytes calldata proof) external view returns (bytes32 storageValue);
}

contract L2ValueCacher {

	bytes32 public secureValueCache;
	uint256 public cacheBatchIndex;
	IScrollChainCommitmentVerifier stateCommitmentVerifier;

	event SecureValueChange(
		address indexed valueSetter,
		bytes32 newValue,
		uint256 batchIndex
	);

	constructor(address scrollChainCommitmentVerifierAddress) {
        // on Sepolia: 0xE0BfA7f3B06A9589A914BE09Ba0E5671f481A722
		stateCommitmentVerifier = IScrollChainCommitmentVerifier(scrollChainCommitmentVerifierAddress);
	}


	function setSecureValueCache(uint256 _batchIndex, address _account, bytes32 _storageKey, bytes calldata _proof) public returns (bool){

		require(_batchIndex > cacheBatchIndex, "Cache must be more recent than existing cache.");

		bytes32 l2SecureValue = stateCommitmentVerifier.verifyStateCommitment(_batchIndex, _account, _storageKey, _proof);

		secureValueCache = l2SecureValue;
		cacheBatchIndex = _batchIndex;

		emit SecureValueChange(msg.sender, l2SecureValue, _batchIndex);

		return(true);
	}

}