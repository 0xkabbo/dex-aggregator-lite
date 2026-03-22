# DEX Aggregator Lite

A professional-grade smart contract and suite of scripts for aggregating liquidity across decentralized exchanges. This repository demonstrates how to interact with multiple automated market makers (AMMs) to minimize slippage and maximize output.

## Core Features
* **Multi-Router Support:** Compatible with Uniswap V2, SushiSwap, and Uniswap V3.
* **Price Comparison:** Logic to identify the most efficient route for a given token pair.
* **Safety Checks:** Integrated slippage protection and deadline management.
* **Flat Structure:** All logic contained in the root for rapid prototyping.

## Prerequisites
* Hardhat / Foundry
* Access to an Archive Node or RPC (Alchemy/Infura) for mainnet forking.

## Usage
1. `npm install`
2. Update `RPC_URL` in `hardhat.config.js` to a Mainnet fork.
3. Run `npx hardhat run swap-test.js` to simulate a cross-platform trade.
