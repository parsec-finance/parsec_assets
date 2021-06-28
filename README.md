# Parsec Finance Assets Repo

Boilerplate for creating github compatible readme files

## Background

> In order to keep our portfolios up-to-date on [app.parsec.finance](https://app.parsec.finance), we are open-sourcing assets and their various locations in the DeFi ecosystem.

## Example

Example base asset:

```text
{
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
        "0x4691937a7508860f876c9c0a2a617e7d9e945d4b"
    ],
    "decimals": 18,
    "modifiers": [],
    "parent": null,
    "symbol": "WOO",
    "type": "spot",
    "value_index": 0
}
```

Example child asset

```code
{
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
        "0x9ff58f4ffb29fa2266ab25e75e2a8b3503311656"
    ],
    "decimals": 8,
    "modifiers": [],
    "name": "aWBTC V2",
    "parent_asset": "wBTC",
    "type": "lent",
    "value_index": 0
}
```

## How to use

* Open PRs and we will review and merge!
* Locations for staking especially
* LPs ready for children! Use same format as other assets.

## Bugs

If you have questions, feature requests or a bug you want to report, please click [here](https://github.com/Yilber/readme-boilerplate/issues) to file an issue.

## Author

coming soon...

## Support

coming soon...
