// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

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

/**
* @title FreeNearMe
* @dev System for sharing free services in the neighborhood.
*/
contract FreeNearMe {

    /** @dev The denominator for the latitude and longitude int64 coordinates. 
     *  We obtain the lat/long values by doing VALUE/COORD_PRECISION
    */
    int64 constant COORD_PRECISION = 1000000; // 6 decimal degrees = 111mm precision
    /** @dev Used to compare the received lat/long value with the truncated value
     *  with one decimal precision, e.g., truncate(180000000) = 1800.
    */
    int64 constant TRUNCATE = 100000;
    int64 constant MAX_LAT = 90000000; // 90.000000
    int64 constant MAX_LONG = 180000000; // 180.000000

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
        int32 lat;
        int32 long;
        int16 citylat;
        int16 citylong;
    }

    /**
    * @dev Structure for a service update
    * @param serviceId ID of the service
    * @param kind Service type
    */
    struct Update {
        uint256 serviceId;
        string desc;
        uint256 timestamp;
    }

    /// @dev Minimal amount of sponsores required to do writes to the contract.
    uint minSponsors;
    /// @notice Sponsors that a user has. If it has enough it can submit/update services.
    mapping (address => uint256) public sponsorsReceived;
    /// @dev Fast way to find if address1 sponsored address2 (in that order in the mapping).
    mapping (address => mapping(address => bool)) sponsorsGiven;
    /// @notice Submited services.
    Service[] public services;
    /// @notice Updates to the services, e.g., bathroom out of order.
    /// @dev Map serviceId => Array of updates
    mapping (uint256 => Update[]) public servicesUpdates;

    /// @dev citylat and citylong are coordinates truncated to first decimal, this means aprox 11km precision 
    event ServiceRegistered(uint serviceId, int64 lat, int64 long, int16 indexed citylat, int16 indexed citylong, ServiceType indexed kind);
    event ServiceUpdate(uint indexed serviceId, string desc, uint256 timestamp);
    
    /// @dev We start the contract with a seed of trusted users.
    constructor(uint8 _minSponsors, address[] memory initialAddresses) {
        require(_minSponsors > 0);
        require(initialAddresses.length == _minSponsors);

        minSponsors = _minSponsors;

        for(uint i=0; i < _minSponsors; i++){
            address addressToSponsor = initialAddresses[i];
            for(uint j=0; j < _minSponsors; j++){
                address sponsorAddress = initialAddresses[j];
                _sponsorUser(addressToSponsor, sponsorAddress);
            }
        }
    }

    function _sponsorUser(address addressToSponsor, address sponsorAddress) internal {
        require(addressToSponsor != address(0), "Invalid address.");
        require(sponsorAddress != address(0), "Invalid address.");
        sponsorsReceived[addressToSponsor]++;
        sponsorsGiven[sponsorAddress][addressToSponsor] = true;
    }

    /**
    * @dev Modifier to check if the user has been coopted.
    */
    modifier onlySponsored() {
        require(sponsorsReceived[msg.sender] >= minSponsors, "You're not sponsored by enough users to perform this action.");
        _;
    }

    /**
    * @dev Get the service data by its ID
    * @param _id Service ID
    * @return Service Structure with the service information
    */
    function getService(uint256 _id) external view returns (Service memory) {
        require(_id < services.length, "Invalid service ID.");
        return services[_id];
    }

    /**
    * @dev Submit a new service.
    * @param kind The type of service to be submited.
    * @param desc Description of the service, optional.
    * @param lat Latitude coordinate of the service.
    * @param long Longitude coordinate of the service.
    */
    function submitService(ServiceType kind, string memory desc, int32 lat, int32 long) external onlySponsored {
        require(lat <= MAX_LAT && lat >= -MAX_LAT, "Invalid latitude value.");
        require(long <= MAX_LONG && long >= -MAX_LONG, "Invalid longitude value.");

        int16 citylat = int16(lat / TRUNCATE);
        int16 citylong = int16(long / TRUNCATE);

        Service memory service;
        service.desc = desc;
        service.kind = kind;
        service.lat = lat;
        service.long = long;
        service.citylat = citylat;
        service.citylong = citylong;
        services.push(service);

        emit ServiceRegistered(services.length-1, lat, long, citylat, citylong, kind);
    }

    /**
    * @dev Submit an update to a service.
    * @param id The ID of service to be updated.
    * @param desc Description of the update.
    * @param timestamp UNIX timestamp of the update.
    */
    function submitServiceUpdate(uint256 id, string memory desc, uint256 timestamp) external onlySponsored {
        require(id < services.length, "Invalid service ID.");
        require(keccak256(abi.encode(desc)) != keccak256(abi.encode("")), "Update description cannot be empty.");

        Update memory update;
        update.serviceId = id;
        update.desc = desc;
        update.timestamp = timestamp;
        servicesUpdates[id].push(update);

        emit ServiceUpdate(id, desc, timestamp);
    }

    /**
    * @dev Sponsor a user.
    * @param addressToSponsor Address of the user to sponsor.
    */
    function sponsorUser(address addressToSponsor) external onlySponsored {
        require(sponsorsGiven[msg.sender][addressToSponsor] == false, "You already sponsored this user.");
        _sponsorUser(addressToSponsor, msg.sender);
    }
}
