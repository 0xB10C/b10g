---
layout: post
title: Frequently Asked Questions&#58; Bitcoin Transaction Monitor
date: 2019-10-04 09:09:09 +0100
author: b10c
image: /images/2019-10-10/header.png
hidden: true
comments: true
---

The [Bitcoin Transaction Monitor](https://mempool.observer/monitor) provides deeper insights about the usage of the Bitcoin network by showing transactions by time and feerate.
This post answers frequently asked questions about the Bitcoin Transaction Monitor itself. 
{: .text-justify}

![feerate distribution](/images/2019-10-10/header.png)

## Why did you build a Bitcoin Transaction Monitor?

With Bitcoin a permissionless network has been created, where everybody can join.
Companies, services and individual users broadcast transactions to the network.
Plotting these transactions by _arrival time_ and _feerate_ reveals interesting activity patterns.
The Bitcoin Transaction Monitor is built to visualize, share and inform about these patterns.
I hope it lets us gain deeper insights on the usage of the Bitcoin network.
{: .text-justify}

## Where do you get the data about the transactions from?

I run a Bitcoin Core node connected to the Bitcoin network, which passes valid transactions to `memod` (mempool observer daemon) over the zmq interface.
Each passed transaction is processed by `memod` and written into a database. 
{: .text-justify}

## Doesn't the Transaction Monitor reveal private information about transactions ?

The Bitcoin Transaction Monitor shows activity and usage patterns of the Bitcoin network. 
This information can be (and probably is already) used by bad actors to weaken the privacy or even completely depseudonymize transactions.
Yet this information broadcasted on the Bitcoin network is entirely public. 
Raising the awareness on what transactions can reveal is far more valuable than hiding public information.
{: .text-justify}

If I can build a Transaction Monitor that visualizes the data on your laptop, what can a motivated bad actor do with far more resources? 
{: .text-justify}

## What are future ideas for the Bitcoin Transaction Monitor?

Provided I have the time and come up with an efficient architecture I'd like to archive and display historical data.
Additionally, providing a live visualization of incoming transactions would be interesting.
{: .text-justify}


<br>

*I'll likely extend the FAQ with more questions and answers sometime.*