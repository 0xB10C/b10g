---
layout: post
title: Bitcoin feerate distribution per block
date: 2018-02-22 22:22:22 +0100
author: b10c
image: /images/2017-12-18/transactions-dropping-from-mempool.png
---


Data on the feerate distribution per block is rather interesting to us. However it wasn't as easy to query as I first thought. I'm going to describe my first unsuccessful approaches and then explain my final solution. The data is visualized here [EDIT LINK](https://transactionfee.info/charts).
{: .text-justify}


I'll go into beginner to intermediate technical stuff on bitcoin. This is intended as learning resource for developers starting out on small bitcoin projects (i.e. me six month ago).
{: .text-justify}


## Motivation

Our site [transactionfee.info](https://transactionfee.info) lets users check the fee efficiency of a bitcoin transaction they send or received. Next to checking for SegWit and batching we wanted to provide an indicator for optimal feerate usage.
{: .text-justify}

We needed the feerate distribution per block. However we quickly postponed it as *future tech* till transactionfee.info was up and running. Later David Harding gave us [feedback](https://twitter.com/hrdng/status/955489792141287429) to plot the feerate across 10 percentile intervals to see %TODO!!
{: .text-justify}

## Querying each block over the RPC interface
My first proof-of-concept in Python queried each block over the Bitcoin Core RPC interface. The query `getblock <blockhash> 2` returns the corresponding block with all its transactions as JSON. For the feerate distribution per block you'll need to iterate over each transaction in the block and calculate its feerate. This doesn't seem to be to hard as first, since the feerate is just the fee divided by the transaction size.
{: .text-justify}

$$ fee [Satoshi] \over vsize [Byte] $$


Problem: protocoll only refferences output + index


## Reading the .dat files from the disk
As alternative I stumbled about multiple blk*.dat file parsers. However the did not turn out to be as capable as I wished. I could have build up an index of all transactions ever made

## BlockSci
- has example of query in paper
- doesn't support segwit and thus calculates bitcoin fees wrong


## Google's BigQuery Bitcoin Blockchain Dataset
https://cloud.google.com/blog/big-data/2018/02/bitcoin-in-bigquery-blockchain-analytics-on-public-data

- no data on the refferenced input

## Patching Bitcoin Core and -reindex
- thanks to Jonas Nick and Tim
- quick, diff is only three lines
