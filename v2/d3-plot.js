// -------------------------------------------- //
//             Candlestick Plot                 //
// -------------------------------------------- //

function plot_candlestick(pars) {
	// Todo:
	// 	 1. 

	// Initialize selected frame when re-selected
	d3.selectAll(".selected_frame").remove();
	// Create all scalers
	var x_scaler = d3.scaleLinear()
					 .domain([0, pars.ohlc.length])
					 .range([0, pars.width]);

	var y_scaler = d3.scaleLinear()
					 .domain([0, pars.maxHigh - pars.minLow])
					 .range([0, pars.height]);

	var y_axis_scaler = d3.scaleLinear()
						 .domain([pars.minLow, pars.maxHigh])
						 .range([pars.height, 0]);



	var y_axis = d3.axisLeft()
				   .scale(y_axis_scaler)
				   .tickSize(0)
				   .ticks(6)

	// "#2d3747": black, "#ff4444": red
	var color = d3.scaleOrdinal()
				  .domain(['neg', 'pos'])
				  .range([pars.color_down, pars.color_up]); 



	var chart = this.selectAll(".rect")
				.data(pars.ohlc)
				.enter()
	 			.append("g")
				.classed(pars.classname, true)
				.attr("transform", "translate(" + pars.margin.left + ", " + pars.margin.top +")");
	
	/*
	if (pars.yaxis){
		chart.append("g")
			 .attr("class", "yAxis")
			 .attr("transform", "translate(" + pars.axes_margin + "," + (-pars.axes_margin) + ")")
		     .call(y_axis)
		     .selectAll("text")
		       .attr("font-family", "Papyrus") 
	}*/

	//change color
	d3.selectAll("path")
      .attr("stroke","#E4E4E4")
      //.attr("stroke-width", "0px")

	d3.selectAll(".tick line")
	  .attr("stroke", "#E4E4E4")
      .attr("stroke-width", "1px")

	// Realbody bar (of Candlestick)
	chart.append("rect")
		.attr("class", "realbody")
		.attr("x", function(d, i) {
			return x_scaler(i) + pars.axes_margin*2;
		})
		.attr("y",  function(d, i) {
			var max_oc = d3.max([d.close, d.open]);
			return pars.height - y_scaler(max_oc - pars.minLow) - pars.axes_margin;
		})
		.attr("width", function(d, i) {
			return x_scaler(1) - pars.candlestick_margin;
		})
		.attr("height", function(d, i) {
			var max_oc = d3.max([d.close, d.open]);
			var min_oc = d3.min([d.close, d.open]);
			var realbody = max_oc - min_oc;
			if (realbody == 0) {
				realbody = 0.1;
			}
			return y_scaler(realbody);
	    })
		.style("fill", function(d, i) {
			var neg_or_pos;
			var diff = d.close - d.open;
			if (diff <= 0) {
				neg_or_pos = "neg";
			} else {
				neg_or_pos = "pos";
			}
			return color(neg_or_pos);
		});

	// Upper shadow (of Candlestick)
	chart.append("rect")
		.attr("class", "upper")
		.attr("x", function(d, i) {
			return (x_scaler(i) + x_scaler(i + 1) - pars.candlestick_margin) / 2 + pars.axes_margin*2;
		})
		.attr("y",  function(d, i) {;
			return pars.height - y_scaler(d.high - pars.minLow) - pars.axes_margin;
		})
		.attr("width", 2)
		.attr("height", function(d, i) {
			var max_oc = d3.max([d.open, d.close]);
			var length = d.high - max_oc;
			return y_scaler(length);
		})
		//.style("fill", pars.color_down);
		.style("fill", function(d, i) {
			var neg_or_pos;
			var diff = d.close - d.open;
			if (diff <= 0) {
				neg_or_pos = "neg";
			} else {
				neg_or_pos = "pos";
			}
			return color(neg_or_pos);
		});

	// Lower shadow (of Candlestick)
	chart
	.append("rect")
		.attr("class", "lower")
		.attr("x", function(d, i) {
			return (x_scaler(i) + x_scaler(i + 1) - pars.candlestick_margin) / 2 + pars.axes_margin*2;
		})
		.attr("y",  function(d, i) {;
			var min_oc = d3.min([d.open, d.close]);
			return pars.height - y_scaler(min_oc - pars.minLow) - pars.axes_margin;
		})
		.attr("width", 2)
		.attr("height", function(d, i) {
			var min_oc = d3.min([d.open, d.close]);
			var length = min_oc - d.low;
			return y_scaler(length);
		})
		//.style("fill", pars.color_down);
		.style("fill", function(d, i) {
			var neg_or_pos;
			var diff = d.close - d.open;
			if (diff <= 0) {
				neg_or_pos = "neg";
			} else {
				neg_or_pos = "pos";
			}
			return color(neg_or_pos);
		});

	pars['chart'] = chart;
	pars['x_scaler'] = x_scaler;
	pars['y_scaler'] = y_scaler;		
	return pars;
};
