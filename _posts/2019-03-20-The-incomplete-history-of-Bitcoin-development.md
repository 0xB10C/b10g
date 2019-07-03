---
layout: post
title: The incomplete history of Bitcoin development
date: 2019-07-02 12:00:00 +0100
author: b10c
hidden: true
image: /images/history-1-nov-08.png
comments: true
---

To fully understand the current Bitcoin protocol development, knowledge about historical events is essential.
This blog post highlights selected events, software releases and bug fixes.
The attached [timeline](#timeline-bitcoin-history) provides details for each event.
{: .text-justify}

I wasn't following the Bitcoin space when the majority of these events happened.
Most points on the timeline are adopted from a talk [John Newberry](https://twitter.com/jfnewbery) gave on the [History and Philosophy of Bitcoin Development](https://www.meetup.com/BitDevsNYC/events/262321510/). 
{: .text-justify}

The title is chosen to remind the reader that a blog post can't capture every event.
History is in the eye of the beholder.
History evolves.
If you have a suggestion about something I missed or want to propose a change:
The attached timeline is an open source project [`bitcoin-development-history`](https://github.com/0xB10C/bitcoin-development-history) everybody can use and contribute to.
Please consider opening a [pull request](https://github.com/0xB10C/bitcoin-development-history/pulls) or an [issue](https://github.com/0xB10C/bitcoin-development-history/issues).
{: .text-justify}

## With Satoshi

The timeline tells a story which begins sometime in early 2007.
Satoshi Nakamoto starts working on Bitcoin. 
The peer-to-peer electronic cash system with no trusted third party.
Controlled only by the software users run.
{: .text-justify}

Early on contributors join Satoshi working on Bitcoin.
These add for example support for [Linux](#2009-release-0-2-0) and [macOS](#2010-release-0-3-0).
Over the summer of 2010 Satoshi authors a lot of critical software changes. 
For example [checkpoints](#2010-release-0-3-2) are introduced as a safeguard against malicious peers broadcasting low difficulty chains. 
Checkpoint help by rejecting blocks which do not hash to a hard coded block hash for a specific block height. 
Satoshi alone adds these checkpoints. 
{: .text-justify}

A few days later Satoshi released the first consensus change in [version v0.3.3](#2010-release-0-3-3). 
Satoshi urges users to upgrade.
Over the next month [multiple minor releases](#2010-release-multiple-0-3-xx) are published.
One of the fixes a [critical overflow bug](#2010-bug-overflow-bug) where two high value UTXOs are created.
Satoshi advises miners to reorg the blocks containing the invalid transactions.
{: .text-justify}

A week later Satoshi introduces an [alert system](#2010-post-alert-system) to inform node operators about problems in the network.
The alert system includes a safe mode.
The safe mode, once triggered, disables all money handling RPC methods in the entire network.
Alerts are only valid when signed with a key only Satoshi has access to.
Some users raise the question what could happen when a second party, for example a government, gets access to these keys by for example arresting Satoshi.
{: .text-justify}

Satoshi has the full power over the Bitcoin network.
The main concern here isn't that Satoshi could turn evil on the network and try to destroy it. 
The main concern is that there shouldn't be a single point of failure in a decentralized system.
Some might argue Satoshi stepping away from Bitcoin is one of his greatest contributions.
{: .text-justify}

## Without Satoshi

In December 2010 Satoshi opened his [last thread](#2010-post-final) on bitcointalk announcing the removal of the safe mode.
Satoshi later writes in one of his [last emails](#2011-other-last-contact-satoshi):
*»I've moved on to other things. It's in good hands with Gavin and everyone.«*
{: .text-justify}

Around the same time the [development process moves](#2010-other-moved-to-github) from SVN to GitHub.
And famous [contributors](#2011-other-new-contributors) like TheBlueMatt, sipa, laanwj and gmaxwell join the project. 
In mid 2011 the [BIP progress](#2011-other-first-bip) for Bitcoin Improvement Proposal is introduced.
In the last quarter of 2011 and the first of 2012 the community discusses [various proposals](#2011-other-p2sh) that allow the receiver of a transaction to specify the script needed to spend it.
Out of them P2SH is implemented and merged.
{: .text-justify}

In fall 2012 the [Bitcoin Foundation](#2012-other-bitcoin-foundation) is announced.
It hopes to be for Bitcoin what the Linux Foundation is for Linux.
However the announcement of the Bitcoin Foundation isn't welcome by the community.
Early on people raise the fear of development centralization.
{: .text-justify}

Bitcoin version [v0.8.0 is released](#2013-release-0-8-0) in spring 2013 .
Two weeks after the release an [unexpected hardfork](#2013-bug-hardfork) splits the network in nodes that have and haven't yet upgraded.
The hardfork is resolved fairly quickly. 
Different miners react by shifting their hashpower to the chain valid for both upgraded and not upgraded versions.
{: .text-justify}

In late 2013 the Bitcoin Software is [rebranded to Bitcoin Core](#2013-other-rebranding-to-core).
In the next year companies such as [Chaincode](#2014-company-chaincode) and [Blockstream](#2014-company-blockstream) are founded. 
Later the [MIT Digital Currency Initiative](#2015-other-mit-dci) joins Chaincode and Blockstream by paying developers and researchers working on Bitcoin. 
{: .text-justify}

In February 2015 Poon and Dryja release the first draft of the [Lightning Whitepaper](#2015-other-lightning-whitepaper).
The next year Dashjr revises the BIP process with [BIP 2](#2016-other-bip-2) and the Bitcoin Core release v0.13.0 includes [SegWit](#2016-release-0-13-1) as a softfork. 
At the beginning of November 2016 the [alert system](#2016-other-alert-system-retired) is retired and in August 2017 [SegWit](#2017-other-segwit-activated) gets activated. 
{: .text-justify}

The year 2019 brings a new company, [Square Crypto](#2019-company-squarecrypto), sponsoring Bitcoin development and a the [taproot proposal](#2019-post-taproot) by Wuille.
{: .text-justify}

<br>

# Timeline 

The timeline is based on my open source project [`bitcoin-development-history`](https://github.com/0xB10C/bitcoin-development-history).

<br>

<div class="timeline" id="timeline-bitcoin-history"></div> 

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

