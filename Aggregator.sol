// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

/**
 * @title DexAggregator
 * @dev Simple aggregator for comparing and executing swaps on Uniswap V2 clones.
 */
contract DexAggregator {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function getAmountOut(
        address router,
        uint256 amountIn,
        address[] memory path
    ) public view returns (uint256[] memory amounts) {
        return IUniswapV2Router02(router).getAmountsOut(amountIn, path);
    }

    function executeSwap(
        address router,
        uint256 amountIn,
        uint256 amountOutMin,
        address[] memory path,
        address to,
        uint256 deadline
    ) external {
        IERC20(path[0]).transferFrom(msg.sender, address(this), amountIn);
        IERC20(path[0]).approve(router, amountIn);

        IUniswapV2Router02(router).swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            to,
            deadline
        );
    }
}
