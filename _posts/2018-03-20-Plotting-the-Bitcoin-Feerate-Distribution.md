---
layout: post
title: Plotting the Bitcoin Feerate Distribution
date: 2018-03-18 12:00:00 +0100
author: b10c
image: /images/2018-03-20/twitter.png
---

How did the median bitcoin feerate evolve [from 2013 to 2015?](https://transactionfee.info/?chart=feerateMedian&rollavg=14&stepPlot=false&startDate=1356744082089&endDate=1451504895039) When were the [feerate spikes in 2017?](https://transactionfee.info/charts?chart=feerateDetailed&rollavg=7&stepPlot=true&startDate=1482873644491&endDate=1514947309661)
Visualising the bitcoin feerate distribution per block was on my todo list since I've started working on [mempool.observer](https://mempool.observer) in mid 2017. But acquiring the data wasn't as easy as I first thought.
{: .text-justify}

In this post I describe my unsuccessful approaches and explain my final solution. I'll go into beginner to intermediate technical stuff on bitcoin. I hope this post might help people who are just starting out on small bitcoin projects (i.e. me a few month ago).
{: .text-justify}

![feerate distribution]({{ site.baseurl }}/images/2018-03-20/header.png)

## Motivation

Our site [transactionfee.info](https://transactionfee.info) lets a user check the fee efficiency of a bitcoin transaction they've send or received. Besides SegWit and output batching we wanted to provide an indicator when a service drastically overpays the feerate. We needed data on the feerate distribution per block to determine what a low, but reasonable feerate would have been to be included in the same block. David Harding  [suggested](https://twitter.com/hrdng/status/955489792141287429) to plot the feerate across ten-percentile intervals to see which percentile is suitable.
{: .text-justify}

## Querying feerate data over the RPC interface
My first idea was to query each block over the Bitcoin Core RPC interface. The query [getblock _blockhash_ 2](https://bitcoin-rpc.github.io/getblock.html) returns the corresponding block with all its transactions as JSON. For the feerate distribution per block I'd need to iterate over each transaction and calculate its feerate. The feerate is specified as the transaction fee divided by the transaction vsize $$(2)$$. The fee is the sum of all input amounts deducted by the sum of all output amounts $$(1)$$.
{: .text-justify}

$$(1)~~~~~~$$ $$fee =  \sum amount_{in} - \sum amount_{out} $$

$$(2)~~~~~~$$ $$feerate = \frac{fee}{vsize} $$

But querying each block with its transactions is not enough. An input only references a previous transaction output (TXO). It doesn't contain the actual input amount. This can be solved by simply querying the TXO. RPC-call batching brings huge performance improvements here.
{: .text-justify}

I coded a small python script and used a local testnet node to generate a first dataset. Everything worked fine and I quickly had a basic chart setup to share my initial proof of concept. However I didn't think about testnet versus mainnet performance. Since blocks on mainnet 1) contain more transactions and  2) more inputs per transaction the script ran ages querying data form my old HDD. I eventually stopped it and started looking for alternatives.
{: .text-justify}

## Alternatives

### Reading the raw .dat files
I looked at multiple blk*.dat-file parsers to build an TXO-index for quicker lookups. However this turned out to be a dead end. I wanted to automatically update the data every few hours on a small VPS, but the output of the index would probably have been more than hundred gigabytes. This was no option for me.
{: .text-justify}

### Google's BigQuery Bitcoin Blockchain Dataset
When I stumbled over [Google's BigQuery Bitcoin Blockchain Dataset](https://cloud.google.com/blog/big-data/2018/02/bitcoin-in-bigquery-blockchain-analytics-on-public-data) I thought that all my data problems were solved. But was I quickly disappointed with the limited data that's available. I missed the reference to the TXO in the input table. The dataset might be well suited for other projects and one plus point definitely is the ten minute update interval, but I, at least for this project, have no use for it.
{: .text-justify}

### BlockSci
Then I found out about [BlockSci](https://github.com/citp/BlockSci): "A high-performance tool for blockchain science and exploration". Is seems to do exactly what I wanted to do. But at the time I looked into it, it didn't use the vsize for feerate calculation. This would have resulted in an incorrect feerate for SegWit transactions. However a few days ago v0.4.0 was released which [uses the vsize for feerate calculations](https://github.com/citp/BlockSci/issues/43). If you are interested in working with data from the bitcoin blockchain I can highly recommend taking a look at their [paper](https://arxiv.org/pdf/1709.02489.pdf).
{: .text-justify}

## Solution: Batching Bitcoin Core and -reindex'ing
As final solution I included a simple LogPrintf in validation.cpp of Bitcoin Core. I print an identifier to grep for followed by the block height and the feerate for each non-coinbase transaction into the debug.log separated by a comma. The patch diff consists of only [three additions](https://github.com/bitcoin/bitcoin/commit/be9d6276092f32de74cc8cd0454f0a82a378f38d). After compiling and a full `-reindex` of the blockchain my debug.log contained all blocks with the feerate of each transaction. Grepping the blocks from the debug.log leaves me with about a gigabyte of raw data (around 100MB gziped).
{: .text-justify}

![Block 510851 and its feerates]({{ site.baseurl }}/images/2018-03-20/feerate.png){: style="margin-bottom:10px;margin-top:50px;"}

## Using the dataset

I have a pruned node running on a small VPS and insert the percentile data into a database. I then automatically generate the .csv-files which are displayed on [transactionfee.info/charts](https://transactionfee.info/charts?chart=feerateDetailed&rollavg=7). In my next step I'll connect the database to an indicator on [transactionfee.info](https://transactionfee.info/).
{: .text-justify}

I guess I'll be using the raw data to experiment a bit with Gnuplot in the future. I have a neat idea for that. And retrospectively rating feerate estimation algorithms might be an idea, too. But I'm not sure how big of a topic the feerate will be in the next few months. Feel free to [contact me](https://b10c.me/about/) if you are interested in the dataset.
{: .text-justify}
