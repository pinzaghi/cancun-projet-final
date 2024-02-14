// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Test, console2} from "forge-std/Test.sol";
import {FreeNearMe, ServiceType} from "../src/FreeNearMe.sol";

contract CounterTest is Test {
    FreeNearMe public fnm;

    address public user1;
    address public user2;
    address public user3;
    address public user4;

    address[] public seed;

    FreeNearMe.Service public service1;

    FreeNearMe.Update public su1;

    function setUp() public {
        user1 = makeAddr("user1");
        user2 = makeAddr("user2");
        user3 = makeAddr("user3");

        user4 = makeAddr("user4");

        seed.push(user1);
        seed.push(user2);
        seed.push(user3);

        fnm = new FreeNearMe(3, seed);

        service1.serviceId = 0;
        service1.desc = "Super clean!";
        service1.kind = ServiceType.Bathroom;
        service1.lat = 48825077;
        service1.long = 2291092;
        service1.citylat = 488;
        service1.citylong = 22;

        su1.serviceId = 0;
        su1.desc = "Out of order :(";
        su1.timestamp = 1707322299;
        
    }

    function sponsorUser4() internal {
        vm.prank(user1);
        fnm.sponsorUser(user4);
        vm.prank(user2);
        fnm.sponsorUser(user4);
        vm.prank(user3);
        fnm.sponsorUser(user4);
    }

    function test_SponsorUser() public {
        sponsorUser4();

        assertEq(fnm.sponsorsReceived(user4) == 3, true);
    }

    function test_RevertWhen_UnsponsoredCannotSponsor() public {
        vm.prank(user4);
        vm.expectRevert(bytes("You're not sponsored by enough users to perform this action."));
        fnm.sponsorUser(user1);
    }

    function test_SponsoredCanSponsor() public {
        sponsorUser4();

        vm.prank(user4);
        fnm.sponsorUser(user1);

        assertEq(fnm.sponsorsReceived(user1) == 4, true);
    }

    function test_RevertWhen_DoubleSponsor() public {
        vm.prank(user1);
        vm.expectRevert(bytes("You already sponsored this user."));
        fnm.sponsorUser(user2);
    }

    function test_RevertWhen_InvalidSponsored() public {
        vm.prank(user1);
        vm.expectRevert(bytes("Invalid address."));
        fnm.sponsorUser(address(0));
    }

    function test_RevertWhen_InvalidService() public {
        vm.prank(user1);
        vm.expectRevert(bytes("Invalid service ID."));
        fnm.getService(0);
    }

    function test_ExpectEmit_SubmitService() public {
        vm.expectEmit(true, true, true, true);
        emit FreeNearMe.ServiceRegistered(0, "", 48825077, 2291092, 488, 22, ServiceType.Bathroom);

        vm.prank(user1);
        fnm.submitService(service1.kind, service1.desc, service1.lat, service1.long);
    }

    function test_RevertWhen_SubmitServiceInvalidLatitude() public {
        vm.prank(user1);
        vm.expectRevert(bytes("Invalid latitude value."));
        fnm.submitService(ServiceType.Bathroom, "", 90000001, 0);
    }

    function test_RevertWhen_SubmitServiceInvalidLongitude() public {
        vm.prank(user1);
        vm.expectRevert(bytes("Invalid longitude value."));
        fnm.submitService(ServiceType.Bathroom, "", 0, -180000001);
    }

    function test_SubmitService() public {
        vm.prank(user1);
        fnm.submitService(service1.kind, service1.desc, service1.lat, service1.long);

        FreeNearMe.Service memory s = fnm.getService(0);

        assertEq(s.serviceId == service1.serviceId, true);
        assertEq(keccak256(abi.encode(s.desc)) == keccak256(abi.encode(service1.desc)), true);
        assertEq(s.lat == service1.lat, true);
        assertEq(s.long == service1.long, true);
        assertEq(s.citylat == service1.citylat, true);
        assertEq(s.citylong == service1.citylong, true);
    }

    function test_ExpectEmit_SubmitServiceUpdate() public {
        vm.prank(user1);
        fnm.submitService(service1.kind, service1.desc, service1.lat, service1.long);

        vm.expectEmit(true, false, false, true);
        emit FreeNearMe.ServiceUpdate(0, su1.desc, su1.timestamp);

        vm.prank(user1);
        fnm.submitServiceUpdate(su1.serviceId, su1.desc, su1.timestamp);
    }

    function test_RevertWhen_SubmitServiceUpdateInvalidID() public {
        vm.prank(user1);
        vm.expectRevert(bytes("Invalid service ID."));
        fnm.submitServiceUpdate(1000, su1.desc, su1.timestamp);
    }

    function test_RevertWhen_SubmitServiceUpdateEmptyDesc() public {
        vm.prank(user1);
        fnm.submitService(service1.kind, service1.desc, service1.lat, service1.long);

        vm.prank(user1);
        vm.expectRevert(bytes("Update description cannot be empty."));
        fnm.submitServiceUpdate(0, "", su1.timestamp);
    }

}
