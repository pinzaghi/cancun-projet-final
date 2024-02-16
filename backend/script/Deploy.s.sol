// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Script, console2} from "forge-std/Script.sol";
import "../src/FreeNearMe.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        string memory key = "SEED_ADDRESS_VALUES";
        string memory delimiter = ",";
        address[] memory seed = vm.envAddress(key, delimiter);

        vm.startBroadcast(deployerPrivateKey);

        FreeNearMe fnm = new FreeNearMe(uint8(seed.length), seed);

        vm.stopBroadcast();
    }

    // add this to be excluded from coverage report
    function test() public {}
}
