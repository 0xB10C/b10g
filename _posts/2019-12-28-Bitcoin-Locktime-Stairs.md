---
layout: post
title: The Stair-Pattern in Bitcoin Transaction Locktimes
date: 2020-01-17 09:09:09 +0000
author: b10c
image: /images/2020-01-17/expected-pattern.png
---

Some of the commonly used Bitcoin wallets, for example the _Bitcoin Core_ wallet and the _Electrum Bitcoin Wallet_, set the locktime of generated transactions to the current block height.
My expectation is that this should be visible as a stair-pattern when plotting the transactions by their mempool entry time and locktime.
{: .text-justify}

![Expected stair pattern in transaction locktimes](/images/2020-01-17/expected-pattern.png){: .center-image }
Transactions with the locktime set to the current block height should form a horizontal line.
Every time a new block is found the line jumps up by one.
{: .text-justify .image-caption}

As I plotted a few transactions by their locktime to test my expectation and I found something odd.
It turned out to be a bug in a wallet software.
{: .text-justify}


## Theory

Bitcoin transactions can contain a so-called time lock as a time-based validity condition.
There are different types of time locks in Bitcoin. 
The focus here is on transactions that are time locked with a _lock-by-block-height_ to an absolute block height via the _nLocktime_ field.
This field holds a 32 bit unsigned integer and is present in every Bitcoin transaction.
If the field has a value higher than `0` and at least one input has a _nSequence_ number below `0xffffffff`, then the time lock is enforced.
A _nLocktime_ value between `0` and lower than `500000000` specifies a lock-by-block-height.
Transactions with a lock-by-block-height of `n` can only be included in a block with a height of `n` `+` `1` or above.
Likewise, a block with the height `n` can only include transactions with a locktime of `n` `-` `1` or below.
Additionally, a Bitcoin Core node does not relay or accept transactions with a locktime higher than the current block height to its mempool.
{: .text-justify}


Some Bitcoin wallets specify a lock-by-block-height with the current height when creating a new transaction.
This is done to make a potentially disruptive mining strategy, called _fee-sniping_, less profitable.
Fee-sniping is not an issue currently, but could cause chain reorgs and network hiccups in the future.
Since the block subsidy declines to zero over time, transaction fees will become the main monetary incentive for miners.
A constant backlog of high-fee transactions is needed to incentivize miners to move the chain forward.
If high-fee transactions are rare, then it could be profitable for a large miner to attempt to reorg (i.e. to stale) a recent high-fee block found by another miner.
By mining a replacement of the high-fee block the miner gets to pay out the transaction fees to himself.
He essentially steals or _snipes_ the fees assuming his block ends up in the strong-chain.
However, a fee-sniping miner is not limited to only include the transactions from the high-fee block.
He would want to maximize his payout by constructing a replacement block with the highest feerate transactions from the high-fee block and the transactions that entered his mempool since the high-fee block was found.
{: .text-justify}

When multiple miners try to fee-snipe, then the network experiences hiccups and reorgs regularly.
After a high-fee block a miner is incentivized to mine in-place rather than moving the chain forward.
This is inconvenient for users.
Setting the current block height as a lock-by-block-height forbids a fee-sniping miner to use transactions from the mempool his replacement block.
It in fact creates an incentive to move the chain forward to be able to include the next batch of time locked high-fee transactions in a block.
{: .text-justify}


![anti-fee-sniping example](/images/2020-01-17/fee-sniping.png){: .center-image }
**Example.** Making fee-sniping less profitable by setting the current block height as a _lock-by-block-height_:
Block `b2` with a height of `n` `+` `1` pays it's miner Alice a high fee.
Miner Eve attempts to reorg block `b2` and snipe the fees from Alice with block `b3`.
The mempool includes two transactions paying a high fee of one bitcoin each.
However, Eve can only include transaction `tx1` in block `b3`.
Transaction `tx2` can't be included in `b3` as it's only valid in a block with a hight of `n` `+` `2` or more.
If all (high-fee) transactions would set a lock-by-block-height to the current block height, then fee-sniping would be more risky and less profitable.
{: .text-justify .image-caption}

## Observation

Transactions with the locktime set to the current block height should form a stair-pattern when plotted by mempool entry time and locktime.
To visualize this I've used data from my [Bitcoin Transaction Monitor](https://mempool.observer/monitor) project.
{: .text-justify}

<div class="chart" id="chart-with-bug-1" style="min-height: 600px;"></div>
The scatterplot shows transactions with a locktime between 608507 and 608519 that entered my mempool on the 17th of December 2019 between 12:06 am and 2:08 pm UTC.
The dot radius represents the feerate the transaction pays.
Additionally, blocks found in the displayed timeframe (height 608509 to 608519) are shown.
{: .text-justify .image-caption}

The expected stair-pattern of transaction with a lock-by-block-height is visible.
A few transactions are locked to a height below the current block height.
These are probably transactions that are not broadcast immediately after creation.
This happens for example with high-latency mixers and some CoinJoin implementations.
To increase the privacy of these transactions the Bitcoin Core wallet [randomly chooses](https://github.com/bitcoin/bitcoin/blob/e6acd9f72c61bf535d9413854b1434ec40633ca0/src/wallet/wallet.cpp#L2490-L2495) a locktime up to 100 blocks below the current height for 10% of the created transactions.
{: .text-justify}


Interestingly enough, the plot shows transactions with two different locktimes arriving at the same time.
For example, between block 608511 and block 608512 transactions with a locktime of 608511, the current height, and 608512, the `current height` `+` `1`, entered my mempool.
This seems odd.
Recall that my Bitcoin Core node should not accepted transactions with a locktime higher than the current block height to its mempool.
It turns out that these transactions have inputs with a `nSequence` number of `0xffffffff` and the _lock-by-block-height_ is thus not enforced.
{: .text-justify}

These transactions all have common properties and a quite unique fingerprint.
All are spending either P2SH, nested P2WSH or P2WSH inputs and are [BIP-69](https://github.com/bitcoin/bips/blob/master/bip-0069.mediawiki) compliant (inputs and outputs ordered lexicographically).
Most of them pay a feerate of 12.3 sat/vByte and all spend 2-of-3 multisig inputs.
This leads me to the assumption that these transactions are created with the same wallet and maybe even broadcast by the same entity.
{: .text-justify}

<div class="chart" id="chart-with-bug-2" style="min-height: 600px;"></div>
The plot visualizes the same transactions as the plot above.
Transactions spending multisig inputs are highlighted in red. 
{: .text-justify .image-caption}


## Resolution

With the unique fingerprint of these transactions it was fairly easy to figure out where these transactions could originate from.
I reached out to them, they confirmed the issue and asked to remain unnamed for now.
The transactions should be time locked to the current block height and at least one of the inputs should have a _nSequence_ number of `0xfffffffe`.
A bug fix implementing this has been released.
However, it will take a while before all instances of the currently deployed software will be upgraded. 
{: .text-justify}

<!--div class="chart" id="chart-without-bug" style="min-height: 600px;"></div-->


<hr>
TODO:
- how long has this been going on
- fix tooltip position
- update with chart once the issue is resolved

<script src="/data/bitcoin-locktime-stairs/d3.js" integrity="sha256-x4D7g5KkbQk6aRjxRFqlCsyMytoqhcisSwVVsVepuuE=" crossorigin="anonymous"></script>
<script src="/data/bitcoin-locktime-stairs/locktime-charts.js"></script>

<style>
.tooltip {
  position: absolute;
  pointer-events: none;
  background: white;
  width: 300px;
}

table {
  background: white;
  border: 1px solid gray;
}

.chart {
  width: 100%;
  position: relative;
}


.chart>div {
  position: absolute;
}

svg {
  pointer-events: none;
}

circle {
  stroke-width: 4px;
  opacity: 0.5;
  fill: none;
}

</style>
