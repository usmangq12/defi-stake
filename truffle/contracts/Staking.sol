// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.7.0;

import "./IERC20.sol";

contract Staking {
    IERC20 public token;

    uint256 public rewardRate;
    uint256 public APR = 1000; // 10%
    uint256 public constant SECONDS_IN_YEAR = 31536000; // 365 * 24 * 60 * 60

    struct Stake {
        uint256 stakedAmount;
        uint256 rewardsEarned;
        uint256 start;
        uint256 lastRewardCalculationTime;
        uint256 lockExpiry;
    }

    mapping(address => Stake) public stakes;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event ClaimedRewards(address indexed user, uint256 rewards);

    constructor() public {
        token = IERC20(msg.sender);
        Stake storage user = stakes[msg.sender];
        rewardRate = (((user.stakedAmount * APR) / 10000)) / SECONDS_IN_YEAR;
    }

    function stake(uint256 _amount) external {
        require(_amount > 0, "No tokens found");

        // Transfer the staking amount to contract account using IERC20
        bool isTransfered = token.transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        require(isTransfered, "Token transfer failed");

        Stake storage user = stakes[msg.sender];
        user.stakedAmount += _amount;
        user.rewardsEarned += calculateRewards();
        user.lastRewardCalculationTime = block.timestamp;
        user.start = user.start = block.timestamp;
        user.lockExpiry = block.timestamp;

        emit Staked(msg.sender, _amount);
    }

    function unstake(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");

        Stake storage user = stakes[msg.sender];
        user.stakedAmount = 0;
        user.rewardsEarned = 0;
        user.lastRewardCalculationTime = 0;
        user.start = 0;
        user.lockExpiry = 0;

        emit Unstaked(msg.sender, _amount);
    }

    function calculateRewards() public view returns (uint256 rewards) {
        Stake storage user = stakes[msg.sender];
        uint256 timeElapsed = block.timestamp - user.lastRewardCalculationTime;
        // TODO require(timeElapsed > lockExpiry);
        uint256 calculatedRewards = (user.stakedAmount *
            rewardRate *
            timeElapsed) / 1e18;
        return calculatedRewards;
    }

    function claimRewards() external {
        Stake storage user = stakes[msg.sender];
        uint256 rewards = calculateRewards();
        require(rewards > 0, "No rewards to claim");

        user.rewardsEarned += rewards;
        user.lastRewardCalculationTime = block.timestamp;

        bool success = token.transfer(msg.sender, rewards);
        require(success, "Token transfer failed");

        emit ClaimedRewards(msg.sender, rewards);
    }
}
