# FreeNearMe

## Installation

```shell
cd backend/
forge install
cd frontend/
npm install
```

## Frontend

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
ETHERSCAN_API_KEY={Etherscan api key}
SEED_ADDRESS_VALUES={A list of comma separated public addresses}
```

Deploy locally:
```shell
$ cd backend/
$ anvil
$ forge script script/FreeNearMe.s.sol:DeployScript --fork-url http://localhost:8545 --broadcast
```

Deploy to Sepolia:
```shell
source .env
forge script script/FreeNearMe.s.sol:DeployScript --rpc-url $SEPOLIA_RPC_URL --etherscan-api-key $ETHERSCAN_API_KEY --broadcast --verify -vvvv
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