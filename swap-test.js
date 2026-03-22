const { ethers } = require("hardhat");

async function main() {
  const UNISWAP_V2_ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const SUSHISWAP_ROUTER = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";
  const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

  const Aggregator = await ethers.getContractFactory("DexAggregator");
  const aggregator = await Aggregator.deploy();

  const amountIn = ethers.parseEther("1");
  const path = [WETH, USDC];

  const uniPrice = await aggregator.getAmountOut(UNISWAP_V2_ROUTER, amountIn, path);
  const sushiPrice = await aggregator.getAmountOut(SUSHISWAP_ROUTER, amountIn, path);

  console.log(`Uniswap V2 Quote: ${ethers.formatUnits(uniPrice[1], 6)} USDC`);
  console.log(`SushiSwap Quote: ${ethers.formatUnits(sushiPrice[1], 6)} USDC`);

  const bestRouter = uniPrice[1] > sushiPrice[1] ? UNISWAP_V2_ROUTER : SUSHISWAP_ROUTER;
  console.log(`Executing swap on: ${bestRouter}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
