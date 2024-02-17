# FreeNearMe

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
PRIVATE_KEY={Anvil private key if local, wallet private key if testnet}
PUBLIC_CONTRACT_ADDRESS=
ETHERSCAN_API_KEY={Etherscan api key}
SEED_ADDRESS_VALUES={A list of comma separated public addresses}
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