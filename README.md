# FreeNearMe

A decentralized app for searching and sharing free services in your city.

- Smart contract deployed to testnet Sepolia: https://sepolia.etherscan.io/address/0x053DDeE2A3899f34205b9c695EAB223d049A023b
- Frontend deployed to Vercel: https://cancun-projet-final.vercel.app/

It allows you to:
- Search services in the map by category
- Submit new services with an optional description. You need to be coopted by a member to perform this action.
- Invite new users to the app

## Installation

```shell
cd backend/
forge install
cd frontend/
npm install
```

## Frontend

Create a .env file:
```shell
touch frontend/.env
```

Set the constants:
```
NEXT_PUBLIC_WALLETCONNECTID=
NEXT_PUBLIC_CONTRACT_ADDRESS=
NEXT_PUBLIC_CONTRACT_BLOCK=
```

```shell
cd frontend/
npx next dev
```

## Backend

Create a .env file:
```shell
touch backend/.env
```

Set the constants:
```
SEPOLIA_RPC_URL={e.g., Alchemy App API Key}
ETHERSCAN_API_KEY={Etherscan api key}

PRIVATE_KEY={Anvil private key if local, wallet private key if testnet}
PUBLIC_CONTRACT_ADDRESS=
SEED_ADDRESS_VALUES={A list of comma separated public addresses to sponsor}
```

Deploy locally:
```shell
$ cd backend/
$ anvil
$ forge script script/Deploy.s.sol:DeployScript --fork-url http://localhost:8545 --broadcast
```

Deploy to Sepolia:
```shell
source .env
forge script script/Deploy.s.sol:DeployScript --rpc-url $SEPOLIA_RPC_URL --etherscan-api-key $ETHERSCAN_API_KEY --broadcast --verify -vvvv
```

## Test and coverage

```shell
$ forge test
```

```shell
$ forge coverage
```

| File               | % Lines         | % Statements    | % Branches      | % Funcs       |
|--------------------|-----------------|-----------------|-----------------|---------------|
| src/FreeNearMe.sol | 100.00% (28/28) | 100.00% (30/30) | 100.00% (14/14) | 100.00% (5/5) |
| Total              | 100.00% (28/28) | 100.00% (30/30) | 100.00% (14/14) | 100.00% (5/5) |

## Misc

Submit service script (local):
```shell
$ cd backend/
$ anvil
$ forge script script/SubmitService.s.sol:SubmitServiceScript --fork-url http://localhost:8545 --broadcast
```

Submit service script (Sepolia):
```shell
$ cd backend/
$ anvil
$ forge script script/SubmitService.s.sol:SubmitServiceScript --rpc-url $SEPOLIA_RPC_URL --etherscan-api-key $ETHERSCAN_API_KEY --broadcast --verify -vvvv
```