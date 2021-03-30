import Web3 from 'web3';
import {StakingABI} from "./StakingRewards.abi.js";
import {ERC20ABI} from "./ERC20.abi.js";
const fs = require('fs');

// to run: npx babel-node StakingRewardsGenerator "<ETHRPC>" "<StakingRewards Contract Addr>" "<Staking Owner protocol, i.e. Float>" "<Optional adjusted name>"

const [
	web3Host,
	stakingContract,
	name,
	adjustedTokenSymbol
] = process.argv.slice(2);

let web3 = new Web3(web3Host);

function asStakingContract(contractAddr) {
	return new web3.eth.Contract(StakingABI, contractAddr);
}

function asERC20(contractAddr) {
	return new web3.eth.Contract(ERC20ABI, contractAddr);
}

async function getStakingToken(staking) {
	return await staking.methods.stakeToken().call();
}

async function getSymbol(token) {
	return await token.methods.symbol().call();
}

async function getDecimals(token) {
	return await token.methods.decimals().call();
}

async function getInfo(contract) {
	// get staking contract
	let staking = asStakingContract(contract);
	// get staked token
	let token = asERC20(await getStakingToken(staking));
	let symbol;

	// some tokens need manual adjusting of symbol (i.e. YAMv3)
	if (!adjustedTokenSymbol) {
		symbol = await getSymbol(token);
	} else {
		symbol = adjustedTokenSymbol;
	}

	// get decimals & get children file
	let decimals = await getDecimals(token);
	let full_name = name+" Staked " + symbol;
	let file = '../children/'+symbol+'.json';

	let children = JSON.parse(fs.readFileSync(file, 'utf8'));

	// create the new child
	let newChild = {
		"balance_func": [
			"balanceOf(address)",
			[
				{
				    "address": "$userAddress"
				}
			],
			[
				"uint256"
			],
			contract
	    ],
	    "decimals": parseInt(decimals),
	    "modifiers": [],
	    "name": full_name,
	    "parent_asset": symbol,
	    "type": "staked",
	    "value_index": 0
	};

	// add to parsed children
	children.push(newChild);

	// filter out dupes by full name
	const filteredArr = children.reduce((acc, current) => {
	  const x = acc.find(item => item.name === current.name);
	  if (!x) {
	    return acc.concat([current]);
	  } else {
	    return acc;
	  }
	}, []);

	// write out updated list
	fs.writeFileSync(file, JSON.stringify(filteredArr, null, 2))
}

getInfo(stakingContract)
