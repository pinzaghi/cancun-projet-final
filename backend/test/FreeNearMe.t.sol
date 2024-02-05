// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Test, console2} from "forge-std/Test.sol";
import {FreeNearMe} from "../src/FreeNearMe.sol";

contract CounterTest is Test {
    FreeNearMe public fnm;

    function setUp() public {
        fnm = new FreeNearMe();
    }
}
