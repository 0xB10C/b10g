---
layout: post
title: The incomplete history of Bitcoin development de-centralisation
date: 2019-06-20 12:00:00 +0100
author: b10c
hidden: true
---

To understand the current state of Bitcoin protocol development, knowledge about historical events in it's development is essential.
This blog post and the attached timeline highlight important events, software releases and bug fixes. 
{: .text-justify}

The title is deliberately choosen to !represent!other word! that a short blog post about Bitcoin's history can't capture every event.
History is in the eye of the beholder.
History evolves.
{: .text-justify}

I personally weren't activly following developments in the Bitcoin space when the majority of the events happend.
Most points on the timeline are adopted from a talk [John Newberry](https://twitter.com/jfnewbery) gave on the »[History and Philosophy of Bitcoin Development](https://www.meetup.com/BitDevsNYC/events/262321510/)«. 
If you have a suggestion about something I missed or want to propose a change:
Please consider opening a [pull request](TODO:) with a change or an [issue](TODO:) to the open source project [TODO:name](TODO:).
If you are unfamiliar with GitHub, let me please know over other communication channels.
{: .text-justify}

## The centralized beginning

The timeline below tells a story which begins sometime early in 2007.
Satoshi start working on Bitcoin. 
The peer-to-peer electronic cash system with no trusted third party.
Controlled only by the software users run on their computers.
{: .text-justify}

Early on contributors join Satoshi working on Bitcoin.
These add for example support for [Linux](#2009-release-0-2-0) and [macOS](#2010-release-0-3-0).
Over the summer of 2010 Satoshi makes a lot of critical software changes. 
For example [checkpoints](#2010-release-0-3-2) are introduced as a safeguard against malicous peers broadcasting low difficulty chains. 
Checkpoint solve that by rejecting blocks which do not hash to the hard coded block hash for a specific block height. 
These checkpoints are added by Satoshi. 
*Satoshi can invalidate chains*.
{: .text-justify}

A few days later Satoshi relased the first consensus change in [version v0.3.3](#2010-release-0-3-3). 
Satoshi urges users to upgrade.
In the next month multiple minor releases are published.
One of the fixes a [critical overflow bug](#2010-bug-overflow-bug) where two high value UTXOs are created.
Satoshi promts miners to reorg the blocks with the invalid transactions.
*Satoshi can command miners to reorg the chain*.
{: .text-justify}

A week later Satoshi introduces an [alert system](#2010-post-alert-system) to inform node operators about problems in the network.
The alert system includes a safe-mode for a short period of time.
The safe mode, once triggered by an alert, disables all money handling RPC methods in the whole network.
Alerts are only valid when signed with a key only Satoshi has access to.
Some users raise the question what could happen when a second party, for example a goverment, gets access to these keys by arresting Satoshi.
*Satoshis keys stop payment processing in the whole network*.
{: .text-justify}

The main concern is not that Satoshi could turn evil on the network and try to destroy it. 
There shouln't be a single point of failure. 
No central point which opens attack vectors.
{: .text-justify}

## The disappearing of Satoshi

Later that year, in December 2010, Satoshi starts his [last thread](#2010-post-final) on bitcointalk.org.
Satoshi writes in one of his [last emails](#2011-other-last-contact-satoshi): »I've moved on to other things. It's in good hands with Gavin and everyone.«
{: .text-justify}

Around that time the [development process moves](#2010-other-moved-to-github) from SVN to GitHub.
Famouse [contributors](#2011-other-new-contributors) like TheBlueMatt, sipa, laanwj and gmaxwell join the project. 
In mid 2011 the [BIP progress](#2011-other-first-bip) for Bitcoin Improvement Proposal is introduced.
In the last quarter of 2011 and the first of 2012 the community discusses [various proposals](#2011-other-p2sh) that allow the receiver of a transaction to specify the script needed to spend it.
Out of them P2SH is merged.
{: .text-justify}

In fall 2012 the [Bitcoin Foundation](#2012-other-bitcoin-foundation) is annouced. 
**TODO: what does the foundation do?**
However the annoucement of the Bitcoin foundation isn't welcome by the community.
{: .text-justify}


In spring 2013 Bitcoin version [v0.8.0 is released](#2013-release-0-8-0).
However two weeks after the release an [unexpected hardfork](#2013-bug-hardfork) split the network in nodes that have and haven't upgraded.
The hardfork was resovled fairly quickly. 
Different miners reacted by shifting their hash power to the chain valid for the old and the new nodes.
{: .text-justify}

In late 2013 the Bitcoin Software is [rebranded](#2013-other-rebranding-to-core) to Bitcoin Core.
Companies such as [Chaincode](#2014-company-chaincode) and [Blockstream](#2014-company-blockstream) and later the [MIT Digital Currency Initiative](#2015-other-mit-dci) are founded. 
{: .text-justify}

- lightning network
- bip 2
- alert system retired
- segwit 
- taproot proposed



Today removed:
- alert system
- checkpoints not that curcial
- no new checkpoints added since 

<br>
<br>
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

    loadJSON("/data/bitcoin-history.json", function (response) {
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
    border-image: linear-gradient(45deg, rgba(126, 126, 126, 0.75) 0%, rgba(85, 85, 85, 0.75)) 1 100%; 
  }

</style>

