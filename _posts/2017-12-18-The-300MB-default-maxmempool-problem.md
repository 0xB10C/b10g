---
layout: post
title: The 300MB default maxmempool Problem
date: 2017-12-18 16:16:16 +0100
image: /images/2017-12-18/transactions-dropping-from-mempool.png
---

Unconfirmed transaction are quite a hassle for bitcoin users.
I recently came across an interesting problem which is not the usual "my transaction is stuck" problem.
{: .text-justify}

In the last weeks of 2017 the number of unconfirmed transactions has again reached all time highs.
Periods with over 100k transactions in my mempool where not unusal.
Bitcoin Core limits the system memory allocated for storing unconfirmed transactions to 300MB by default.
This serves as an anti-DoS feature.
Fully used 300MB of RAM equal about 110MB of actual raw transaction data.
This default value [can be changed](https://en.bitcoin.it/wiki/Running_Bitcoin) with the `-maxmempool <n>` option where `n` is the amount of megabytes allocated to store unconfirmed transactions.
{: .text-justify}

{% highlight sh %}
$ bitcoin-cli getmempoolinfo
{
  "size": 123803,               # amount of tx
  "bytes": 107840125,           # raw tx bytes
  "usage": 298526272,           # tx in ram bytes
  "maxmempool": 300000000,      # maxmempool in bytes
  "mempoolminfee": 0.00016486   # min tx-fee to get accepted
}
{% endhighlight %}


Once 300MB of system memory are reached, Bitcoin  Core starts dropping low-feerate transactions from the mempool for high-feerate transactions.
Additionally a _mempoolminfee_-threshold is set to prevent new low fee transactions from entering the mempool.
{: .text-justify}

![chained mempool transactions]({{ site.baseurl }}/images/2017-12-18/transactions-dropping-from-mempool.png)
Transactions dropping from mempool - [https://mempool.observer](https://mempool.observer/#size-7d)
{: style="text-align: center; margin-bottom:40px;"}


A node operator can increase or decrease the _maxmempool_ option to better fit their system.
I assume that for example some blockexplorers have increased their _maxmempool_.
I know that Jochen Hoenicke for example has an node running with a [_maxmempool_ of 2GB](https://www.reddit.com/r/Bitcoin/comments/7i6rnu/why_is_no_one_talking_about_the_178000/dqx5osf/).
{: .text-justify}

# The Problem
Small differences in the mempool are common.
However with an increased _maxmempool_ a nodes mempool can differ vastly from a majority of other nodes on the network.
These nodes, especially when they power a blockexplorer, still many keep unconfirmed transactions the majority of the network has already dropped.
This can be irritating for users.
{: .text-justify}

I came a cross a particular form of this problem, when a friend asked me, why he can see a certain low-fee transaction on [bitaps.com](https://bitaps.com), but not on [blockchain.info](https://blockchain.info).
My local node, with a default 300MB _maxmempool_, responded with an error on calling the _getrawtransaction_ RPC with the txid.
{: .text-justify}

{% highlight sh %}
$ bitcoin-cli getrawtransaction <txid>
error code: -5
error message:
No such mempool transaction.
{% endhighlight %}

However using the [bitaps.com](https://bitaps.com) API to query the raw transaction worked fine.
I tried rebroadcasting the raw transaction with _sendrawtransaction_.
This failed.
{: .text-justify}

{% highlight sh %}
$ bitcoin-cli sendrawtransaction <rawtx>
error code: -25
error message:
Missing inputs
{% endhighlight %}

Looking at the missing input I noticed that it references a unconfirmed change output from an transaction with equally low fees.
However I again wasn't able to find the parent transaction for the input in my local mempool or on [blockchain.info](https://blockchain.info).
Only [bitaps.com](https://bitaps.com) had it.
And this transaction again referenced an unconfirmed low-fee output as an input.
{: .text-justify}

With the context of the _maxmempool_ limit this started to make sense.

# My guess on what happened

My guess on what happened is, that [bitaps.com](https://bitaps.com) has an higher _maxmempool_-limit than e.g. [blockchain.info](https://blockchain.info) and therefore does not drop the transactions.
A user checking [bitaps.com](https://bitaps.com) sees the transaction, a user checking [blockchain.info](https://blockchain.info) doesn't.
{: .text-justify}


![chained mempool transactions]({{ site.baseurl }}/images/2017-12-18/chained-mempool-tx.png)

The real issue appears when the original sender is not aware of this and has a peer with a larger-than-default mempool.
He unknowingly continues to chain transactions to a unconfirmed parent transaction that the vast majority of the network rejects.
The broadcasted transaction spends an output which references a dropped transaction and therefore is invalid.
{: .text-justify}

# A Solution

A Solution might simply be:

**Pay more fees if you want to make sure your transactions don't get dropped.**
{: style="text-align: center; margin-bottom:10px;"}

And maybe consider doing some sort of checking if you create long chains of unconfirmed low-fee transactions.
To temporarily fix this one could rebroadcast all dropped transactions in the correct order hoping that they don't get dropped again.
{: .text-justify}
