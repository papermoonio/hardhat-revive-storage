// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Storage.sol";

contract Deployer {
    event StorageDeployed(address indexed addr);

    function deployStorage(bytes32 salt, uint256 initialNumber) public returns (address) {
        bytes memory bytecode = abi.encodePacked(
            type(Storage).creationCode,
            abi.encode(initialNumber)
        );

        address storageAddr;
        assembly {
            storageAddr := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
            if iszero(storageAddr) {
                revert(0, 0)
            }
        }

        emit StorageDeployed(storageAddr);
        return storageAddr;
    }

    function computeAddress(bytes32 salt, uint256 initialNumber) public view returns (address) {
        bytes memory bytecode = abi.encodePacked(
            type(Storage).creationCode,
            abi.encode(initialNumber)
        );

        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                address(this),
                salt,
                keccak256(bytecode)
            )
        );

        return address(uint160(uint(hash)));
    }
}
