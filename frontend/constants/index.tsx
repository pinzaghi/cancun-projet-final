export const servicesTypes = {
                "Bathroom" : "Bathroom",
                "WiFi" : "WiFi",
                "ATM" : "ATM",
                "Workstation" : "Workstation",
                "ChargingStation" : "Charging",
                "AirPump" : "Air pump",
                "BikeWorkshop" : "Bike SOS",
                "Water" : "Water",
            };
			
export const servicesTypeIndex = {
	"Bathroom" : 0,
	"Water" : 1,
	"WiFi" : 2,
	"AirPump" : 3,
	"BikeWorkshop" : 4,
	"Workstation" : 5,
	"ATM" : 6,
	"ChargingStation" : 7,
	"Other" : 8,
};
export const coordinatesPrecision = 1000000;
export const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
export const contractBlock = BigInt(process.env.NEXT_PUBLIC_CONTRACT_BLOCK);
export const abi = [
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_minSponsors",
				"type": "uint8"
			},
			{
				"internalType": "address[]",
				"name": "initialAddresses",
				"type": "address[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "serviceId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "desc",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "int64",
				"name": "lat",
				"type": "int64"
			},
			{
				"indexed": false,
				"internalType": "int64",
				"name": "long",
				"type": "int64"
			},
			{
				"indexed": true,
				"internalType": "int16",
				"name": "citylat",
				"type": "int16"
			},
			{
				"indexed": true,
				"internalType": "int16",
				"name": "citylong",
				"type": "int16"
			},
			{
				"indexed": true,
				"internalType": "enum ServiceType",
				"name": "kind",
				"type": "uint8"
			}
		],
		"name": "ServiceRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "serviceId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "desc",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "ServiceUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "UserSponsored",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getService",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "serviceId",
						"type": "uint256"
					},
					{
						"internalType": "enum ServiceType",
						"name": "kind",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "desc",
						"type": "string"
					},
					{
						"internalType": "int32",
						"name": "lat",
						"type": "int32"
					},
					{
						"internalType": "int32",
						"name": "long",
						"type": "int32"
					},
					{
						"internalType": "int16",
						"name": "citylat",
						"type": "int16"
					},
					{
						"internalType": "int16",
						"name": "citylong",
						"type": "int16"
					}
				],
				"internalType": "struct FreeNearMe.Service",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "services",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "serviceId",
				"type": "uint256"
			},
			{
				"internalType": "enum ServiceType",
				"name": "kind",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "desc",
				"type": "string"
			},
			{
				"internalType": "int32",
				"name": "lat",
				"type": "int32"
			},
			{
				"internalType": "int32",
				"name": "long",
				"type": "int32"
			},
			{
				"internalType": "int16",
				"name": "citylat",
				"type": "int16"
			},
			{
				"internalType": "int16",
				"name": "citylong",
				"type": "int16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "servicesUpdates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "serviceId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "desc",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addressToSponsor",
				"type": "address"
			}
		],
		"name": "sponsorUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "sponsorsReceived",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum ServiceType",
				"name": "kind",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "desc",
				"type": "string"
			},
			{
				"internalType": "int32",
				"name": "lat",
				"type": "int32"
			},
			{
				"internalType": "int32",
				"name": "long",
				"type": "int32"
			}
		],
		"name": "submitService",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "desc",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "submitServiceUpdate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]