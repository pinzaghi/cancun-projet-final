// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Script, console2} from "forge-std/Script.sol";
import "../src/FreeNearMe.sol";

contract SubmitServiceScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address contractPublicKey = vm.envAddress("PUBLIC_CONTRACT_ADDRESS");

        vm.startBroadcast(deployerPrivateKey);

        FreeNearMe fnm = FreeNearMe(contractPublicKey);
        fnm.submitService(ServiceType.Bathroom, "Very clean!", 48859002, 2390195);

        vm.stopBroadcast();
    }

    // add this to be excluded from coverage report
    function test() public {}
}
