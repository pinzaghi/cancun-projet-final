// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

/**
* @title FreeNearMe
* @dev System for sharing free services in the neighborhood.
*/
contract FreeNearMe {

    /** @dev The denominator for the latitude and longitude int64 coordinates. */
    uint64 constant RESOLUTION = 100000000000000;

    /**
    * @dev Structure for a service
    * @param serviceId ID of the service
    * @param kind Service type
    * @param desc Brief description of the service or important notes
    * @param lat Latitude coordinate where to find the service
    * @param long Longitude coordinate where to find the service
    */
    struct Service {
        uint256 serviceId;
        ServiceType kind;
        string desc;
        int64 lat;
        int64 long;
    }

    /**
    * @dev Enum for the different kinds of services, values are self-explanatory
    */
    enum  ServiceType {
        Bathroom,
        Water,
        WiFi,
        AirPump,
        BikeWorkshop,
        Workstation,
        ATM,
        Other
    }

    struct Update {
        string desc;
    }

    /// @dev Minimal amount of sponsores required to do writes to the contract.
    uint minSponsors;
    /// @notice Sponsors that a user has. If it has enough it can submit/update services.
    mapping (address => address[]) sponsors;
    /// @notice Submited services.
    Service[] services;
    /// @notice Updates to the services, e.g., bathroom out of order.
    mapping (uint256 => Update[]) servicesUpdates;
    
    /// @dev We start the contract with a seed of trusted users.
    constructor(uint8 _minSponsors, address[] memory initialAddresses) {
        require(_minSponsors > 0);
        require(initialAddresses.length == _minSponsors);

        minSponsors = _minSponsors;

        for(uint i=0; i < _minSponsors; i++){
            address addressToSponsor = initialAddresses[i];
            for(uint j=0; j < _minSponsors; j++){
                address sponsorAddress = initialAddresses[j];
                sponsors[addressToSponsor].push(sponsorAddress);
            }
        }
    }
}
