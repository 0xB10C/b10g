---
layout: post
title: A List of Public Bitcoi Feerate Estimation APIs
date: 2019-06-29 09:09:09 +0100
author: b10c
image: /images/2019-07-29/feerate-api.png
comments: true
hidden: false
---

Me searching for a list of public bitcoin feerate estimation APIs ended without any real results.
[Jameson Lopp](https://twitter.com/lopp) has a section on feerate estimators on his [bitcoin.page](https://www.lopp.net/bitcoin-information/fee-estimates.html) and [Antoine Le Calvez's](https://twitter.com/khannib) dashboard [p2sh.info](https://p2sh.info/dashboard/db/fee-estimation) provides a visualisation of different estimation APIs.
But that is not what I was looking for.
That's why I compiled this list. 
{: .text-justify}

I opted to only include publicly advertised feerate estimation APIs by e.g. payment processors and block explorers.
Purposfully leaving out list APIs by wallets, such as Mycelium and Trezor, because their APIs are not publicly advertised.
Additionaly I'm leaving out Bitcoin Core's feerate estimates via the [`estimatesmartfee` RPC](https://bitcoincore.org/en/doc/0.18.0/rpc/util/estimatesmartfee/).
I don't consider the RPC publicly reachable as in *reachable over the web by everyone* (some [services](https://wasabiwallet.io/swagger/index.html) wrap the `estimatesmartfee` RPC however).
{: .text-justify}

The following list of public feerate APIs is lexicographically sorted.


### bitcoiner.live API

The [bitcoiner.live](https://bitcoiner.live/) API provides `sat/vByte` estimates for confirmation in half an hour, 1 hour, 2 hours, 3 hours, 6 hours, 12 hours and 24 hours. 
It's reachable under [`https://bitcoiner.live/api/fees/estimates/latest`](https://bitcoiner.live/api/fees/estimates/latest).


{% highlight bash %}
{
  "timestamp": 1563456789,
  "estimates": {
    "30": {
      "sat_per_vbyte": 12.0,
      [ ... ]
    },
    "60": {
      "sat_per_vbyte": 12.0,
      [ ... ]
    },
    "120": {
      "sat_per_vbyte": 8.0,
      [ ... ]
    },
    [ ... ]
  }
}
{% endhighlight %}



### Bitgo API


Bitgo's feerate API is reachable under [`https://www.bitgo.com/api/v2/btc/tx/fee`](https://www.bitgo.com/api/v2/btc/tx/fee) and there is documentation available [here](https://bitgo.com/api/v2/#operation/v2.tx.getfeeestimate).
The API returns estimates for different block targets in **`sat/kB`**.  <small> (*`sat/kB / 1000 = sat/Byte`*) </small>


{% highlight bash %}
{
  "feePerKb": 61834,
  "cpfpFeePerKb": 61834,
  "numBlocks": 2,
  "confidence": 80,
  "multiplier": 1,
  "feeByBlockTarget": {
    "1": 64246,
    "2": 61834,
    "3": 56258,
    [ ... ]
  }
}
{% endhighlight %}



### Bitpay Insight API

The API of Bitpay's Insight instance is available under [`https://insight.bitpay.com/api/utils/estimatefee?nbBlocks=2,4,6`](https://insight.bitpay.com/api/utils/estimatefee?nbBlocks=2,4,6).
With the parameter `nbBlocks` the confirmation target in the next *`n`* blocks can be specified.
Feerates are in **`BTC/kB`**. <small>  *(`BTC/kB x 100000 = sat/Byte`)* </small> 

{% highlight bash %}
{
  "2": 0.00051894,
  "4": 0.00047501,
  "6": 0.00043338
}
{% endhighlight %}



### Blockchain.info API

Blockchain.info recommends **`sat/Byte`** feerates via [`https://api.blockchain.info/mempool/fees`](https://api.blockchain.info/mempool/fees).
They provide a `regular` and a `priority` feerate.
Additionally a `minimum` and `maximum` feerate are included.

{% highlight bash %}
{
  "limits": {
    "min": 2,
    "max": 79
  },
  "regular": 4,
  "priority": 53
}
{% endhighlight %}



### Blockchair API

The Blockchair API offers a transaction fee suggestion in **`sat/Byte`** via [`https://api.blockchair.com/bitcoin/stats`](https://api.blockchair.com/bitcoin/stats).
While their API is publicly available for occasional requests, they require an API key for more and periodical requests.
You can read more about the API [here](https://github.com/Blockchair/Blockchair.Support/blob/master/API.md).


{% highlight bash %}
{
  "data": {
    [ ... ]
    "suggested_transaction_fee_per_byte_sat": 1
  },
  [ ... ]
}
{% endhighlight %}



### BlockCypher API

The BlockCypher API includes a `low`, `medium` and `high` feerate estimate in [`https://api.blockcypher.com/v1/btc/main`](https://api.blockcypher.com/v1/btc/main).
The feerates are in **`sat/kB`**. <small> (*`sat/kB / 1000 = sat/Byte`*) </small>


{% highlight bash %}
{
  [ ... ]
  "high_fee_per_kb": 41770,
  "medium_fee_per_kb": 25000,
  "low_fee_per_kb": 15000,
  [ ... ]
}
{% endhighlight %}



### Blockstream.info API

Blockstream.info offers an API returning feerates for different confirmation targets in **`sat/vByte`** under [`https://blockstream.info/api/fee-estimates`](https://blockstream.info/api/fee-estimates).
The API is documented [here](https://github.com/Blockstream/esplora/blob/master/API.md#fee-estimates). 

{% highlight bash %}
{
  "2": 32.749,
  "3": 32.749,
  "4": 24.457,
  "6": 20.098,
  "10": 18.17,
  "20": 10.113,
  "144": 1,
  "504": 1,
  "1008": 1
}
{% endhighlight %}



### BTC.com API

BTC.com offers a feerate estimate for the next block in **`sat/Byte`** under [`https://btc.com/service/fees/distribution`](https://btc.com/service/fees/distribution).


{% highlight bash %}
{
  "tx_size": [ ... ],
  "tx_size_count": [ ... ],
  "tx_size_divide_max_size": [ ... ],
  "tx_duration_time_rate": [ ... ],
  "fees_recommended": {
    "one_block_fee": 14
  },
  "update_time": "1563456789"
}
{% endhighlight %}



### earn.com API

The API behind [bitcoinfees.earn.com](https://bitcoinfees.earn.com) is reachable under [`https://bitcoinfees.earn.com/api/v1/fees/recommended`](https://bitcoinfees.earn.com/api/v1/fees/recommended).
Feerate estimates for the `fastest` confirmation, a confirmation in `half an hour` and `a hour` are shown in **`sat/Byte`**.

{% highlight bash %}
{
  "fastestFee": 44,
  "halfHourFee": 44,
  "hourFee": 4
}
{% endhighlight %}

<br>

*Let me know if I forgot a public API.*  
*Let me know if this list was of use to you.*

<br>

