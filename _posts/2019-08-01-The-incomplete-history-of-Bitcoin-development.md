---
layout: post
title: The incomplete history of Bitcoin development
date: 2019-08-01 09:00:00 +0100
author: b10c
hidden: true
image: /images/history-1-nov-08.png
comments: true
---


To fully understand the rationale behind the current state of Bitcoin development, knowledge about historical events is essential.
This blog post highlights selected historical events, software releases and bug fixes before and after Satoshi left the project.
It additionally contains a section about the current state of Bitcoin development.
The attached [timeline](#timeline-bitcoin-history) provides extra detail for each event.
{: .text-justify}

I wasn't following the Bitcoin space when a majority of these events happened.
A big part of the timeline is adapted from a talk [John Newbery](https://twitter.com/jfnewbery) gave on the [History and Philosophy of Bitcoin Development](https://www.meetup.com/BitDevsNYC/events/262321510/).
The title of this blog post is supposed to remind you that it can't and doesn't include every event.
History is in the beholder's eye.
History evolves.
If you have a suggestion about something missing or want to propose a change, please create an issue in the open-source project [bitcoin-development-history](https://github.com/0xB10C/bitcoin-development-history), which is used to generate the attached timeline.
{: .text-justify}

## With Satoshi

The timeline tells a story beginning in early 2007.
Satoshi Nakamoto starts working on Bitcoin.
The peer-to-peer electronic cash system with no trusted third party.
A system only controlled by the software which its users run.
{: .text-justify}

Early on contributors join Satoshi working on Bitcoin.
These new contributors add support for [Linux](#2009-release-0-2-0) and [macOS](#2010-release-0-3-0) next to many other contributions to the project.
Over the summer of 2010 Satoshi authors a few critical software changes.
For example, [checkpoints](#2010-release-0-3-2) are introduced as a safeguard against malicious peers broadcasting low difficulty chains.
A node enforcing these checkpoints rejects chains which do not include specific block hashs at specific heights.
Checkpoints are hard-coded by Satoshi alone.
In theory, allowing Satoshi to control which chain the whole network follows.
{: .text-justify}

A few days after adding checkpoints Satoshi releases the first consensus change in [version v0.3.3](#2010-release-0-3-3).
Satoshi urges users to upgrade.
Over the next month, multiple [minor versions](#2010-release-multiple-0-3-xx) are released.
One of them fixes a [critical overflow bug](#2010-bug-overflow-bug).
This bug was exploited to create two high-value UTXOs.
Satoshi advises miners to reorg the chain containing the blocks with the malicious transactions.
{: .text-justify}

A week later Satoshi introduces an [alert system](#2010-post-alert-system) to inform node operators about problems in the network.
The alert system includes a safe mode.
The safe mode, once triggered, disables all money handling RPC methods in the entire network.
Only Satoshi can create valid network alerts by signing them with a private key.
Some users raise the question of what could happen when a second party, for example, a government, gets access to this key.
{: .text-justify}

Satoshi has a lot of power over the Bitcoin network at this point.
The main concern here isn't that Satoshi could turn evil on the network and try to destroy it.
The main concern is that there shouldn't be a single point of failure in a decentralized system.
{: .text-justify}

In December 2010 Satoshi opens his [last thread](#2010-post-final) on bitcointalk announcing the removal of the safe mode.
Satoshi later writes in one of his [last emails](#2011-other-last-contact-satoshi):
*»I've moved on to other things. It's in good hands with Gavin and everyone.«*
Some might argue Satoshi stepping away from Bitcoin is one of his greatest contributions.
{: .text-justify}


## Without Satoshi

Around the same time, the [development process](#2010-other-moved-to-github) moves from SVN to GitHub, which leads to longtime [contributors](#2011-other-new-contributors) like TheBlueMatt, sipa, laanwj and gmaxwell joining the project.
In mid-2011 the [BIP process](#2011-other-first-bip) for Bitcoin Improvement Proposals is introduced.
In the last quarter of 2011 and the first of 2012 the community discusses [various proposals](#2011-other-p2sh) that allow the receiver of a transaction to specify the script needed to spend it.
Out of them, P2SH is merged.
{: .text-justify}

In fall 2012 the [Bitcoin Foundation](#2012-other-bitcoin-foundation) is announced.
The Bitcoin Foundation hopes to achieve for Bitcoin what the Linux Foundation does for Linux.
Some people raise the fear of development centralization in the announcement thread.
Bitcoin version [v0.8.0 is released](#2013-release-0-8-0) in spring 2013.
Two weeks after the release an [unexpected hardfork](#2013-bug-hardfork) splits the network in nodes that have and haven't yet upgraded.
The hardfork is resolved fairly quick.
Different miners react by shifting their hashpower to the chain valid for both upgraded and not upgraded nodes.
{: .text-justify}

In late 2013 the Bitcoin Software is [rebranded to Bitcoin Core](#2013-other-rebranding-to-core).
In the following year companies such as [Chaincode](#2014-company-chaincode) and [Blockstream](#2014-company-blockstream) are founded.
Later the [MIT Digital Currency Initiative](#2015-other-mit-dci) joins Chaincode and Blockstream by paying developers and researchers to work on Bitcoin.
In February 2015 Joseph Poon and Tadge Dryja release the first draft of the [Lightning Whitepaper](#2015-other-lightning-whitepaper).
The next year Luke Dashjr revises the BIP process with [BIP 2](#2016-other-bip-2) and the Bitcoin Core release v0.13.0 includes [SegWit](#2016-release-0-13-1) as a softfork.
At the beginning of November 2016 the [alert system](#2016-other-alert-system-retired) is retired and in August 2017 [SegWit](#2017-other-segwit-activated) gets activated.
The year 2019 brings a new company, [Square Crypto](#2019-company-squarecrypto), sponsoring Bitcoin development and the [taproot proposal](#2019-post-taproot) by Pieter Wuille.
{: .text-justify}

## Current state of Bitcoin development

Over the years the development culture became more decentralized, well-defined and rigorous.
There are [six Bitcoin Core maintainers](https://bitcointalk.org/index.php?topic=1774750.0), distributed over three continents, with the ability to merge commits into Bitcoin Core.
Maintainers merge commits by Bitcoin Core contributors.
Before commits get merged they have to go through a [review process](https://github.com/bitcoin/bitcoin/blob/master/CONTRIBUTING.md#peer-review), which has gotten a lot stricter.
{: .text-justify}

For example, a competing proposal, to the earlier mentioned P2SH, was [`OP_EVAL`](#2011-other-p2sh).
The [pull request](https://github.com/bitcoin/bitcoin/pull/669) implementing `OP_EVAL` was merged at the end of 2011 with only one reviewer, albeit it changing consensus-critical code.
Later Russell O’Connor opened an [issue](https://github.com/bitcoin/bitcoin/issues/729) criticizing parts of the implementation and that such a big and consensus-critical should have had a lot more review and testing.
{: .text-justify}

This fueled an ongoing discussion on how to ensure higher code quality through more testing and review.
Today each pull request should at least be reviewed by multiple developers.
If a change touches security-critical or even consensus-critical code, the review process needs many reviewers, a lot of testing and usually spans over multiple months.
[John Newbery](), an active Bitcoin Core contributor, told me that there is _"no chance a consensus change would be merged with a single reviewer today"_.
{: .text-justify}

A lot of work went into automated testing.
There are [unit-tests](https://github.com/bitcoin/bitcoin/blob/master/src/test/README.md) written in C++ and [functional-test](https://github.com/bitcoin/bitcoin/blob/master/test/functional/README.md) written in Python.
Every non-trivial change should update existing tests or add new ones to the frameworks.
Next to unit- and functional-tests, there is an initiative to do [fuzz-testing](https://github.com/bitcoin/bitcoin/blob/master/doc/fuzzing.md) on Bitcoin Core and a [benchmarking framework](https://github.com/bitcoin/bitcoin/blob/master/doc/benchmarking.md) to monitor code performance.
For example the website bitcoinperf.com offers both a [Grafana]((https://bitcoinperf.com/d/YiV16Vsik/overview)) and a [codespeed](https://codespeed.bitcoinperf.com/) interface visualizing benchmarking results.
{: .text-justify}

A well-defined [release process](https://github.com/bitcoin/bitcoin/blob/master/doc/release-process.md) has been put together over the years.
Major releases of Bitcoin Core are scheduled to be released every six months.
The [schedule](https://github.com/bitcoin/bitcoin/issues/15940) includes a [translation process](https://github.com/bitcoin/bitcoin/blob/master/doc/translation_process.md), a feature freeze and usually multiple release candidates.
Recent efforts by [Carl Dong](https://twitter.com/carl_dong) aim to increase the [Bitcoin Core build system security](https://www.youtube.com/watch?v=I2iShmUTEl8) with [deterministic and bootstrappable](https://github.com/bitcoin/bitcoin/blob/master/contrib/guix/README.md) builds.
The new build system might not be fully ready for the v0.19.0 release of Bitcoin Core this fall, but it will most definitely be used in the future.
{: .text-justify}

## Conclusion

Over the past ten years, the Bitcoin development culture has changed a lot.
Moving from being very centralized around Satoshi to being more decentralized with more than a [thousand GitHub contributors in 2018](https://twitter.com/_jonasschnelli_/status/1080713877355081729).
It has gotten clear that very high standards for code review, code quality, and security are needed.
{: .text-justify}

I think to fully understand the rationale behind the current state of Bitcoin development, knowledge about historical events is essential.
There is a timeline with more events attached below. Some further reading could be [The Tao Of Bitcoin Development](https://medium.com/@bergealex4/the-tao-of-bitcoin-development-ff093c6155cd) written by [Alex B.](https://twitter.com/bergealex4), [The Bitcoin Core Merge Process](https://medium.com/@elombrozo/the-bitcoin-core-merge-process-74687a09d81d) written by [Eric Lombrozo](https://twitter.com/eric_lombrozo) or [Who Controls Bitcoin Core?](https://blog.lopp.net/who-controls-bitcoin-core-/) written by [Jameson Lopp](https://twitter.com/lopp).
{: .text-justify}


## Acknowledgements
I am very thankful for John Newbery, who reviewed and helped me shape this blog post. He did a lot of the historical digging for his [History and Philosophy of Bitcoin Development](https://www.meetup.com/BitDevsNYC/events/262321510/) talk, which this blog post is based upon. I'm grateful for [Chaincode Labs](https://chaincode.com) inviting me to their 2019 Summer Residency where I met a lot of awesome people, learned a lot and started to work on this post.
{: .text-justify}


<br>
*There is a [comment section](#comments) at the very bottom of this page, but make sure to check out the timeline first.* 
<hr style="border-top: 0px solid #ffffff0f;">

## Timeline of historical events in Bitcoin development 

This timeline based on the open source project [bitcoin-development-history](https://github.com/0xB10C/bitcoin-development-history).
If you have a suggestion about something missing or want to propose a change, please open an issue.
{: .text-justify}

<br>

<div class="timeline" id="timeline-bitcoin-history"></div> 

<br><br><br>

<div id="comments"></div> 

<script>
  function loadJSON(url, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }

  function createTimepointElement(timepoint) {
    var timepointDiv = document.createElement("div");
    timepointDiv.classList.add("timepoint");
    timepointDiv.id = timepoint.id;
    side = timepointIndex % 2 == 0 ? "left" : "right";
    timepointDiv.classList.add(side);

    var contentDiv = document.createElement("div");
    contentDiv.classList.add("content");
    contentDiv.classList.add("type-" + timepoint.type);

    var titleH3 = document.createElement("h3");
    var titleText = document.createTextNode(timepoint.title);
    titleH3.appendChild(titleText);

    var linkSmall = document.createElement("small")
    var linkAnchor = document.createElement("a");
    var linkText = document.createTextNode(" 🔗");
    linkAnchor.classList.add("timepoint-link")
    linkAnchor.href = "#" + timepoint.id;
    linkAnchor.appendChild(linkText);
    linkSmall.appendChild(linkAnchor);
    titleH3.appendChild(linkSmall);

    contentDiv.append(titleH3);

    for (paragraphIndex in timepoint.paragraphs) {
      var paragraph = document.createElement("p");
      var text = document.createTextNode(timepoint.paragraphs[paragraphIndex]);

      paragraph.appendChild(text);
      contentDiv.appendChild(paragraph);
    }

    for (linkIndex in timepoint.links) {
      var link = timepoint.links[linkIndex]

      if(linkIndex > 0){ // add seperator
        var seperator = document.createElement("span");
        var septext = document.createTextNode(",  ");
        seperator.appendChild(septext)
        contentDiv.appendChild(seperator);
      }

      var anchor = document.createElement("a");
      var label = document.createTextNode(link.label);
      anchor.appendChild(label)
      anchor.href = link.link;

      contentDiv.appendChild(anchor);
    }

    timepointDiv.append(contentDiv);
    return timepointDiv;
  }


  window.onload = function () {

    loadJSON("https://bitcoin-development-history.b10c.me/bitcoin-history.json", function (response) {
      var timepoints = JSON.parse(response);

      var timeline = document.getElementById("timeline-bitcoin-history")

      for (timepointIndex in timepoints) {
        timepoint = timepoints[timepointIndex]
        timepointDiv = createTimepointElement(timepoint)
        timeline.appendChild(timepointDiv);
      }
    });
  }
</script>



<style>
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }


  .timeline {
    position: relative;
    margin: 0 auto;
    max-width: 1200px;
  }

  .timeline::after {
    content: '';
    position: absolute;
    width: 6px;
    background-color: #dedede;
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: 0px;
    border-radius: 3px;
  }

  .timepoint {
    position: relative;
    background-color: inherit;
    width: 50%;
  }

  .timepoint.left {
    padding: 0px 40px 10px 0px;
    left: 0;
  }

  .timepoint.right {
    padding: 0px 0px 10px 40px;
    left: 50%;
  }

  .timepoint h3 {
    margin: 0;
  }

  

  /* The circles on the timeline */
  .timepoint::after {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    right: -10.5px;
    background-color: #999999;
    border: 4px solid #999999;
    top: 23px;
    border-radius: 50%;
    z-index: 1;
  }

  /* Fix the circle for timepoints on the right side */
  .right::after {
    left: -4.5px;
  }

  /* Add arrows to the left timepoint (pointing right) */
  .left::before {
    content: " ";
    height: 0;
    position: absolute;
    top: 22px;
    width: 0;
    z-index: 1;
    right: 30px;
    border: medium solid gray;
    border-width: 10px 0 10px 10px;
    border-color: transparent transparent transparent #efefef;
  }

  /* Add arrows to the right timepoint (pointing left) */
  .right::before {
    content: " ";
    height: 0;
    position: absolute;
    top: 22px;
    width: 0;
    z-index: 1;
    left: 30px;
    border: medium solid gray;
    border-width: 10px 10px 10px 0;
    border-color: transparent #efefef transparent transparent;
  }

  /* The actual content */
  .content {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
    padding: 15px 10px 20px 25px;
    background-color: #efefef;
    position: relative;
  }

  .right .content {
    border-right: 0.5rem solid;
  }

  .left .content {
    border-left: 0.5rem solid;
  }

  .timepoint-link{
    text-decoration: none;
    opacity: 1;
  }

  .content.type-bug {
    border-image: linear-gradient(45deg,rgba(240, 37, 1, 0.75),rgba(255, 0, 0, 0.925)) 1 100%;
  }
  
  .content.type-release {
    border-image: linear-gradient(45deg, rgba(9, 170, 219, 0.75) 0%, rgba(0, 132, 255, 0.75)) 1 100%;
  }

  .content.type-company {
    border-image: linear-gradient(45deg, rgba(219, 250, 15, 0.75) 0%, rgba(176, 238, 4, 0.75)) 1 100%;  
  }

  .content.type-other {
    border-image: linear-gradient(45deg, rgba(10, 226, 179, 0.75) 0%, rgba(5, 245, 185, 0.75)) 1 100%; 
  }

  .content.type-post {
    border-image: linear-gradient(45deg, rgba(240, 225, 60, 0.75) 0%, rgba(250, 229, 0, 0.75)) 1 100%; 
  }

</style>

