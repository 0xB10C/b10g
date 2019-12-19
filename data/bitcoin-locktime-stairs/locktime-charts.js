var gTxDataWithBug = null
var gTxDataWithoutBug = null
var gBlockData = null

async function loadTxDataWithBug(){
  if(gTxDataWithBug == null){
    await d3.json("/data/bitcoin-locktime-stairs/tx-with-bug.json").then(function (data) {
      gTxDataWithBug = data
    });
  }
  return gTxDataWithBug
}

async function loadTxDataWithoutBug(){
  if(gTxDataWithoutBug == null){
    await d3.json("/data/bitcoin-locktime-stairs/tx-with-bug.json").then(function (data) {
      gTxDataWithoutBug = data
    });
  }
  return gTxDataWithoutBug
}


async function loadBlockData(){
  if(gBlockData == null){
    await d3.json("/data/bitcoin-locktime-stairs/blocks-with-bug.json").then(function (data) {
      gBlockData = data
    });
  }
  return gBlockData
}

window.onload = function () {
  redraw(document.getElementById("chart-with-bug-1"), loadTxDataWithBug, cPlain, rFee).then(_ =>
    redraw(document.getElementById("chart-with-bug-2"), loadTxDataWithBug, cMultisig, rFee)//.then(_ =>
      // redraw(document.getElementById("chart-without-bug"), loadTxDataWithoutBug, cMultisig, rFee) 
      // TODO: Load other block data
    // )
  )
}

const timeFormat = d3.timeFormat("%H:%M");
const margin = {top: 0, right: 20, bottom: 50, left: 80};
var xScale = d3.scaleTime()
var yScale = d3.scaleLinear()

// return the chart height and width minus margin
var width = function(chartDiv) {return chartDiv.clientWidth - margin.left - margin.right};
var height = function(chartDiv) {return chartDiv.clientHeight - margin.top - margin.bottom};

// return the x- and y-Axis values for a given data element
var xValue = function (d) {return d.entryTime * 1000;}
var yValue = function (d) {return d.locktime }

// return the scaled x- and y-Axis values for a given data element
var xScaledValue = function (d) {return xScale(xValue(d))}
var yScaledValue = function (d) {return yScale(yValue(d))}

let color1 = "steelblue"
let color2 = "#b10c00"

// coloring functions for the dots
var cPlain = function (d) {return color1;}
var cMultisig = function (d) {return !d.spendsMultisig ? color1 : color2;}

// radius functions for the dots
var rUniform = function () {return 2}
var rSegWit = function (d) {return d.spendsSegWit ? 2 : 5;}
var rSize = function (d) {return Math.log2(d.size * 0.01);}
var rFee = function (d) {return Math.log2(d.fee/d.size);}
var rInputOutputCount = function (d) {return Math.log2(d.outputCount + d.inputCount);}

async function redraw(chartDiv, loadTxDataFunction, colorFunction, radiusFunction) {
  console.debug("started redraw()")

  d3.select(chartDiv).selectAll("*").remove();

  xScale.range([0, width(chartDiv)]);
  yScale.range([height(chartDiv), 5]); // starting without an offset of 5 would cause a y-axis tick to be cut off

  var xAxis = d3.axisBottom(xScale).tickFormat(timeFormat);
  var yAxis = d3.axisLeft(yScale);

  // The svg is appended before the canvas is, so that the svg is behind the canvas.
  var svg = d3.select(chartDiv).append("svg")
    .attr("width", width(chartDiv) + margin.left + margin.right)
    .attr("height", height(chartDiv) + margin.top + margin.bottom)
    .style("left", "0px")
    .style("position", "relative");

  var chartArea = d3.select(chartDiv).append("div")
    .style("position", "absolute")
    .style("left", margin.left + "px")
    .style("top", "0px");

  var canvas = chartArea.append("canvas")
    .attr("width", width(chartDiv))
    .attr("height", height(chartDiv));

  canvasCtx = canvas.node().getContext("2d");

  var tooltip = d3.select(chartDiv).append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  data = await loadTxDataFunction()
  dataBlocks = await loadBlockData()

  var xMin = d3.min(data, function (d) {return xValue(d)})
  var xMax = d3.max(data, function (d) {return xValue(d)})

  data.sort(function(a, b) {
    return yValue(a) - yValue(b);
  });

  var yMin = d3.quantile(data, 0, function (d) {return yValue(d)});
  var yMax = d3.quantile(data, 1, function (d) {return yValue(d)});

  xScale.domain([xMin, xMax]);
  yScale.domain([608507, 608519]);

  quadtree = d3.quadtree()
  .extent([[xScale(xMin), yScale(yMax)], [xScale(xMax), yScale(yMin)]])
  .x(xScaledValue)
  .y(yScaledValue)

  svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate("+ margin.left + " ," + height(chartDiv) + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate("+ margin.left + ",0)")
      .call(yAxis);

  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x", 0 - (height(chartDiv) / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("locktime");

  svg.append("text")
      .attr("transform",
            "translate(" + ((width(chartDiv) + margin.right + margin.left)/2) + " ," +
                          (height(chartDiv) + margin.top + margin.bottom/1.2) + ")")
      .style("text-anchor", "middle")
      .text("mempool entry time");

  var highlight = chartArea.append("svg")
    .style("position", "absolute")
    .style("left", "0px")
    .style("top", "0px")
    .attr("width", width(chartDiv))
    .attr("height", height(chartDiv))
      .append("circle")
      .style("opacity", 0);

  canvasCtx.clearRect(0, 0, width(chartDiv), height(chartDiv));
  drawTransactions(data, canvasCtx, colorFunction, radiusFunction);
  drawBlocks(dataBlocks, canvasCtx);
  fillQuadtree(data, quadtree, radiusFunction);

  canvas.on("mousemove", function(){
    let mouse = d3.mouse(this);
    let closest = quadtree.find(mouse[0], mouse[1]);

    if (closest != undefined && isTransactionVisible(closest, radiusFunction)) {
      highlight.attr("cx", xScale(xValue(closest)))
        .attr("cy", yScale(yValue(closest)))
        .attr("r", radiusFunction(closest))
        .attr("stroke", colorFunction(closest))
        .attr("filter", "blur(0.5px) brightness(96%)")
        .transition().duration(1).style("opacity", 1);

      tooltip.html(formatTooltip(closest))
      let yPos = mouse[1] + 20
      let xPos = mouse[0] + ((mouse[0] <= chartDiv.clientWidth/2) ? 70 : -260);
      tooltip.style("left", xPos + "px")
      tooltip.style("top", yPos + "px");

      tooltip.transition().duration(1).style("opacity", 1);

    }else{
      tooltip.transition().style("opacity", 0);
      highlight.transition().style("opacity", 0);
    }
  });

  canvas.on("mouseout",function(){
    highlight.transition().duration(100).style("opacity", 0);
    tooltip.transition().duration(100).style("opacity", 0);
  });

  console.debug("finished redraw()")
}

async function fillQuadtree(data, quadtree, radiusFunction){
  quadtree.removeAll(quadtree.data())
  data.forEach(function(d){
    if (isTransactionVisible(d, radiusFunction)){
      quadtree.add(d);
    }
  });
}

async function drawTransactions(data, canvasCtx, colorFunction, radiusFunction){
  const maxFeerate = yScale.domain()[1]
  data.forEach(function(d){
    if (isTransactionVisible(d, radiusFunction)) {
      if (yValue(d) <= maxFeerate){
        let color = colorFunction(d);
        let radius = radiusFunction(d);
        canvasCtx.beginPath();
        canvasCtx.fillStyle = color;
        canvasCtx.globalAlpha=0.8;
        canvasCtx.arc(xScaledValue(d), yScaledValue(d), radius, 0, 2 * Math.PI);
        canvasCtx.fill();
      }
    }
  });
}

async function drawBlocks(data, canvasCtx) {
  data.forEach(function(d){
    let x = xScale(d.timestamp*1000)
    canvasCtx.beginPath();
    canvasCtx.moveTo(x, yScale(d.height+0.1));
    canvasCtx.lineTo(x, yScale(d.height-1));
    canvasCtx.globalAlpha = 0.2;
    canvasCtx.stroke();
    canvasCtx.globalAlpha = 0.7;
    canvasCtx.fillStyle = "black";
    canvasCtx.textAlign = "right";
    canvasCtx.fillText(`Block ${d.height}`, x - 5, yScale(d.height-0.5));
  });
}

function isFeerateDefined(feerate){
  return !isNaN(feerate) && feerate > 0
}

function formatTooltipTableRow(name,value) {
  return `<tr><td>${name}</td><td style="max-width: 20ch; word-wrap:break-all;">${value}</td></tr>`
}

function formatTooltip(d){
  return `<div><table class="table"><tbody>
      ${formatTooltipTableRow("Entry time", new Date(xValue(d)).toLocaleTimeString())}
      ${formatTooltipTableRow("Feerate", (d.fee/d.size).toFixed(2) + " sat/vbyte")}
      ${formatTooltipTableRow("Inputs", formatTooltipDicts(d.spends))}
      ${formatTooltipTableRow("Outputs", formatTooltipDicts(d.paysTo))}
      ${formatTooltipTableRow("SegWit spending", d.spendsSegWit)}
      ${formatTooltipTableRow("Explicit RBF", d.signalsRBF)}
      ${formatTooltipTableRow("BIP69 compliant", d.isBIP69)}
      ${formatTooltipTableRow("Multisig spending", d.spendsMultisig)}
      ${d.spendsMultisig ? formatTooltipTableRow("Multisig inputs", formatTooltipDicts(d.multisigsSpend)) : ""}
      ${formatTooltipTableRow("Locktime", d.locktime)}
    </tbody></table></div>
  `
}

function formatTooltipDicts(dict) {
  var formattedString = ""
  for (var key in dict) {
    formattedString = formattedString + `<span>${dict[key] + "x&nbsp;" + key}</span><br>` // produces e.g. `2x <key>`
  }
  return formattedString
}

function isTransactionVisible(tx, radiusFunction){
  if(radiusFunction(tx) <= 0){
    return false;
  }

  if (tx.locktime <= 600000) return false

  return true
}
