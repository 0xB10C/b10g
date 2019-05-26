---
layout: page
title: Projects
permalink: /projects/
---

<br>


<p align="center">
  <a href="https://mempool.observer"><img src="/images/mempool-observer-icon.png" alt="mempool.observer logo"></a>
</p>

This site displays mempool statistics. For example the current mempool and historical mempool of my node are shown. The idea is to provide information about the current mempool state to a bitcoin user with a seemingly stuck and longtime-unconfirmed transaction. Additionally the site can be used for double checking feerate estimates before transacting. The current site is v2, which I build in spring 2019 as a complete remake from [v1](https://web.archive.org/web/20170912070511/https://mempool.observer/) I build in mid 2017. [Read more about the project's history.](https://github.com/0xB10C/memo#project-history)

- [https://mempool.observer](https://mempool.observer)
- [Source on GitHub](https://github.com/0xB10C/memo)

<br>

--- 


<br>

<p align="center">
  <a href="https://transactionfee.info"><img  src="/images/transactionfee-info-logo.png" alt="transactionfee.info logo"></a>
</p>


This site allows users to check the fee efficiency of one of their transactions. I've build this together with [@ziggamon](https://twitter.com/ziggamon) (CEO at Bitrefill) in 2018 when only few exchanges and services made use of payment batching and spend SegWit outputs. On [transactionfee.info/charts](https://transactionfee.info/charts) various metrics about Bitcoin transactions, payments and feerates per day are shown to track the adoption of payment batching and SegWit.

- [https://transactionfee.info](https://transactionfee.info)
- [https://transactionfee.info/charts](https://transactionfee.info/charts)

I've written about efficiently quering the bitcoin feerates per block and why it's not as easy as it sounds in [Plotting the Bitcoin Feerate Distribution](/Plotting-the-Bitcoin-Feerate-Distribution/).


--- 


## mempool-dat

A Go package that deserializes bitcoin mempool `mempool.dat` files. 
- [Source on GitHub](https://github.com/0xB10C/mempool-dat)
- [Documentation on GoDoc](https://godoc.org/github.com/0xB10C/mempool-dat/lib)

<br>

--- 

## c-lightning-plugin-csvexportpays

A c-lightning plugin to export all payments made with a c-lightning node to a csv file.
- [Source on GitHub](https://github.com/0xB10C/c-lightning-plugin-csvexportpays)

![Screenshot of the plugin in action](https://raw.githubusercontent.com/0xB10C/c-lightning-plugin-csvexportpays/6461045b3dc1fe371b19045e4647eeb6c9e0ebaf/screenshot.png)