---
layout: post
title: The 300MB default maxmempool problem
---

Unconfirmed transaction are quite a hassle for bitcoin users.
I recently came across an interesting problem which is not the usual "my transaction is stuck!" problem.

In the last few weeks the mempool has again reached all time highs. Periods where 100000 transactions are waiting to be confirmed were not unusual.

As an anti DoS feature Bitcoin Core nodes limit the system memory storing unconfirmed transactions to 300MB by default. (300MB RAM equals roughly 150MB of actual raw transaction data)
This default value can be changed with the _maxmempool_ option.
Once the Core software reaches 300MB of used system memory it starts dropping low-feerate transactions from the mempool and sets an _mempoolminfee_.
Transactions with lower fees than the _mempoolminfee_-threshold are rejected.

![transactions getting dropped]({{ site.baseurl }}images/2017-12-18/transactions-dropping-from-mempool.png)
> Transactions dropping from mempool - https://mempool.observer/#size-7d


A node operator can increase or decrease the _maxmempool_ option to better fit their needs.

I assume that for example some blockexplorer nodes have increased the _maxmempool_. I know that Jochen Hoenicke for example has an node running with a [_maxmempool_ of 2GB](https://www.reddit.com/r/Bitcoin/comments/7i6rnu/why_is_no_one_talking_about_the_178000/dqx5osf/).

### The Problem

The Problem with an increased _maxmempool_ is, that the mempool differs vastly from the rest of the networks mempool. (small differences in mempool's are however common)
Some explorers still keep a unconfirmed transaction others have already dropped.
This is irritating for unknowing users.

I came a cross a particular form of this problem when a friend asked me why he can see a certain low-fee transaction on bitaps.com but not on blockchain.info.


My local node with the default 300MB _maxmempool_ responded with an error on calling the _getrawtransaction_ RPC.

```
$ bitcoin-cli getrawtransaction <txid>
error code: -5
error message:
No such mempool transaction.
```
Using the bitaps.com API to query the raw transaction worked fine.
I tried rebroadcasting the raw transaction with _sendrawtransaction_.
This failed.

```
$ bitcoin-cli sendrawtransaction <rawtx>
error code: -25
error message:
Missing inputs
```

Looking at the missing input I saw that it references a unconfirmed change output from an transaction with equally low fees.
However I again wasn't able to find the parent transaction in my local mempool or in blockchain.info's mempool. Only bitaps.com had it. And this transaction again referenced an unconfirmed output with low fees as an input.

With the context of the _maxmempool_ limit this started to make sense.

### My guess on what happened

My guess on what happened is, that bitaps.com has an higher _maxmempool_-limit than e.g. blockchain.info and therefore does not drop the transactions.

A user checking bitaps.com sees the transaction, a checking blockchain.info doesn't.

![chained mempool transactions]({{ site.baseurl }}/images/2017-12-18/chained-mempool-tx.png)

The real issue appears when the original sender is not aware of this and has a peer with a larger-than-default mempool. He unknowingly continues to chain transactions to a unconfirmed parent transaction that the vast majority of the network rejects.

### The Solution

The Solution might simply be:

> **Pay more fees if you want to make sure your transactions don't get dropped.**

And maybe consider doing some sort of checking if you create long chains of unconfirmed low-fee transactions.
