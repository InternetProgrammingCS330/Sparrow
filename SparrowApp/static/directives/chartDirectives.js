angular.module('SparrowApp').directive("areachart", function($window) {
	return {
		restrict: 'E',
		scope: {
			data: '='
		},
		link: function (scope, element) {
			var margin = {top: 20, right: 20, bottom: 30, left: 25},
				width = 650 - margin.left - margin.right,
				height = 280 - margin.top - margin.bottom;

			var parseDate = d3.time.format("%d-%b-%y").parse;
			for (var i = 0; i < scope.data.length; i++) {
				console.log(parseDate(scope.data[i].date))
			}

			var x = d3.time.scale().range([0, width]);
			var y = d3.scale.linear().range([height, 0]);

			var area = d3.svg.area()
                .x(function(d) { return x(d.date); })
                .y0(height)
                .y1(function(d) { return y(d.close); });

            var svg = d3.select(element[0]).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			scope.$watch('data', function(){
				scope.render(scope.data);
			}, true); 

			scope.render = function(data) {

				var area = d3.svg.area()
                .x(function(d) { return x(d.date); })
                .y0(height)
                .y1(function(d) { return y(d.close); });

				data.forEach(function(d) {
                	d.date = parseDate(d.date);
                	d.close = +d.close;
                });

				x.domain(d3.extent(data, function(d) { return d.date; }));
				y.domain([0, d3.max(data, function(d) { return d.close; })]);
  
				svg.selectAll('g.axis').remove();

				svg.append("path")
                	.datum(data)
                	.attr("class", "area")
                	.attr("d", area)
                	.style("fill", "#8a89a6");

                svg.append("g")
                	.attr("class", "x axis")
                	.attr("transform", "translate(0," + height + ")")

				svg.append("g")
                	.attr("class", "y axis")
                	.append("text")
                	.attr("transform", "rotate(-90)")
                	.attr("y", this.yaxisPos)
                	.attr("dy", ".71em")
                	.style("text-anchor", "end")
                	.text(this.yaxisName);
			};
		}
	};
});

angular.module('SparrowApp').directive("areachart2", function($window) {
	return {
		restrict: 'E',
		scope: {
			data: '='
		},
		link: function (scope, element) {

			var margin = {top: 20, right: 20, bottom: 30, left: 10},
				width = 300 - margin.left - margin.right,
				height = 310 - margin.top - margin.bottom;

			var svg = d3.select(element[0])
					.append("svg")
					.attr('width', width + margin.left + margin.right)
					.attr('height', height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			// var xAxis = d3.svg.axis()
			// 	.scale(x)
			// 	.orient("bottom");

			// var yAxis = d3.svg.axis()
			// 	.scale(y)
			// 	.orient("left")

			scope.$watch('data', function(){
				scope.render(scope.data);
			}, true); 

			scope.render = function(data) {

				console.log("AREACHART2",data)

				svg.selectAll('g.axis').remove();

				var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
				var y = d3.scale.linear().range([height, 0]);

				var color = d3.scale.ordinal()
	                    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);


				x.domain(data.map(function(d) { return d.time; }));
				y.domain([0, d3.max(data, function(d) { return d.count; })]);
  
				svg.selectAll('g.axis').remove();

				//Render X axis
				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + height + ")")
					// .call(xAxis);

				//Render Y axis
				svg.append("g")
					.attr("class", "y axis")
					// .call(yAxis)
					.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", 6)
					.attr("dy", ".71em")
					.style("text-anchor", "end")
					// .text("Count");
	  
	  
				//Create or update the bar data
				var area = svg.selectAll(".area").data(data);
				area.enter()
					.append("rect")
					.attr("class", "area")
					.attr("d", area)
					.style("fill", "#8a89a6")
					.attr("x", function(d) { return x(d.time); })
					.attr("width", x.rangeBand());

				//Animate bars
				area
					.transition()
					.duration(1000)
					.attr('height', function(d) { return height - y(d.count); })
					.attr("y", function(d) { return y(d.count); })
					.style("fill", function(d){return color(d.time)})
			};
		}
	};
});

angular.module('SparrowApp').directive("likechart", function($window) {
	return {
		restrict: 'E',
		scope: {
			data: '='
		},
		link: function (scope, element) {

			var margin = {top: 20, right: 20, bottom: 30, left: 10},
				width = 300 - margin.left - margin.right,
				height = 310 - margin.top - margin.bottom;

			var svg = d3.select(element[0])
					.append("svg")
					.attr('width', width + margin.left + margin.right)
					.attr('height', height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			// var xAxis = d3.svg.axis()
			// 	.scale(x)
			// 	.orient("bottom");

			// var yAxis = d3.svg.axis()
			// 	.scale(y)
			// 	.orient("left")

			scope.$watch('data', function(){
				scope.render(scope.data);
			}, true); 

			scope.render = function(data) {

				console.log(data)

				svg.selectAll('g.axis').remove();

				var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
				var y = d3.scale.linear().range([height, 0]);

				var color = d3.scale.ordinal()
	                    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);


				x.domain(data.map(function(d) { return d.title; }));
				y.domain([0, d3.max(data, function(d) { return d.countLikes; })]);
  
				svg.selectAll('g.axis').remove();

				//Render X axis
				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + height + ")")
					// .call(xAxis);

				//Render Y axis
				svg.append("g")
					.attr("class", "y axis")
					// .call(yAxis)
					.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", 6)
					.attr("dy", ".71em")
					.style("text-anchor", "end")
					// .text("Count");
	  
	  
				//Create or update the bar data
				var area = svg.selectAll(".area").data(data);
				area.enter()
					.append("rect")
					.attr("class", "area")
					.attr("d", area)
					.style("fill", "#8a89a6")
					.attr("x", function(d) { return x(d.title); })
					.attr("width", x.rangeBand());

				//Animate bars
				area
					.transition()
					.duration(1000)
					.attr('height', function(d) { return height - y(d.countLikes); })
					.attr("y", function(d) { return y(d.countLikes); })
					.style("fill", function(d){return color(d.title)})
			};
		}
	};
});

angular.module('SparrowApp').directive("chart", function($window) {
	return {
		restrict: 'E',
		scope: {
			data: '='
		},
		link: function (scope, element) {
			var margin = {top: 20, right: 20, bottom: 30, left: 10},
				width = 300 - margin.left - margin.right,
				height = 310 - margin.top - margin.bottom;

			var svg = d3.select(element[0])
				.append("svg")
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
			var y = d3.scale.linear().range([height, 0]);

			var color = d3.scale.ordinal()
                    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

			// var xAxis = d3.svg.axis()
			// 	.scale(x)
			// 	.orient("bottom");

			// var yAxis = d3.svg.axis()
			// 	.scale(y)
			// 	.orient("left")

			scope.$watch('data', function(){
				scope.render(scope.data);
			}, true); 

			scope.render = function(data) {
				x.domain(data.map(function(d) { return d.hour; }));
				y.domain([0, d3.max(data, function(d) { return d.sales; })]);
  
				svg.selectAll('g.axis').remove();

				//Render X axis
				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + height + ")")
					// .call(xAxis);

				//Render Y axis
				svg.append("g")
					.attr("class", "y axis")
					// .call(yAxis)
					.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", 6)
					.attr("dy", ".71em")
					.style("text-anchor", "end")
					// .text("Count");
	  
	  
				//Create or update the bar data
				var bars = svg.selectAll(".bar").data(data);
				bars.enter()
					.append("rect")
					.attr("class", "bar")
					.attr("x", function(d) { return x(d.hour); })
					.attr("width", x.rangeBand());

				//Animate bars
				bars
					.transition()
					.duration(1000)
					.attr('height', function(d) { return height - y(d.sales); })
					.attr("y", function(d) { return y(d.sales); })
					.style("fill", function(d){return color(d.hour)})
			};
		}
	};
});

angular.module('SparrowApp').directive("piechart", function($compile,$window) {
	return {
		restrict: 'E',
		scope: {
			data: '='
		},
		link: function (scope, element,attr) {

			// scope.elementId = element.attr("id");
   //          scope.regionClick = function () {
   //              alert("HELLO");
   //          };
   //          element.attr("ng-click", "regionClick()");
   //          element.removeAttr("arc");
   //          $compile(element)(scope);
			var width = 300,
                height = 300,
                radius = Math.min(width, height) / 2;

            var color = d3.scale.ordinal()
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

            var arc = d3.svg.arc()
                .outerRadius(radius - 10)
                .innerRadius(radius - 70);

            var pie = d3.layout.pie()
                .sort(null)
                .value(function(d) { return d.population; });

			var svg = d3.select(element[0])
				.append("svg")
				.attr('width', width)
				.attr('height', height)
				.append("g")
				.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

			scope.$watch('data', function(){
				scope.render(scope.data);
			}, true); 

			scope.render = function(data) {

				var g = svg.selectAll(".arc")
                  	.data(pie(data))
                	.enter().append("g")
                  	.attr("class", "arc");

                g.append("path")
                  .attr("d", arc)
                  .style("fill", function(d) { return color(d.data.age); })
                  .on("click", function (d) {
		            console.log("HELLO");
		          });

                g.append("text")
                  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                  .attr("dy", ".35em")
                  .style("text-anchor", "middle")
                  .text(function(d) { return d.data.age; });
                  
			};
		}
	};
});