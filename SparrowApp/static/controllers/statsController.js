var app = angular.module('statsApp',['ngMaterial']);

app.controller('StatsCtrl',function($rootScope,$timeout, $scope, $http, $location,
	$mdSidenav, $mdDialog,$animate,$filter,$mdSidenav) {

	console.log("HELLO FROM THE statsCtrl");

	$scope.toggleLeft = buildDelayedToggler('left');
	$scope.toggleRight = buildToggler('right');
	$scope.isOpenRight = function(){
		return $mdSidenav('right').isOpen();
	};

	/**
	 * Supplies a function that will continue to operate until the
	 * time is up.
	 */
	 function debounce(func, wait, context) {
	 	var timer;

	 	return function debounced() {
	 		var context = $scope,
	 		args = Array.prototype.slice.call(arguments);
	 		$timeout.cancel(timer);
	 		timer = $timeout(function() {
	 			timer = undefined;
	 			func.apply(context, args);
	 		}, wait || 10);
	 	};
	 }

	/**
	 * Build handler to open/close a SideNav; when animation finishes
	 * report completion in console
	 */
	 function buildDelayedToggler(navID) {
	 	return debounce(function() {
	 		$mdSidenav(navID)
	 		.toggle()
	 		.then(function () {
	 			$log.debug("toggle " + navID + " is done");
	 		});
	 	}, 200);
	 }

	 function buildToggler(navID) {
	 	return function() {
	 		$mdSidenav(navID)
	 		.toggle()
	 		.then(function () {
	 			$log.debug("toggle " + navID + " is done");
	 		});
	 	}
	 }
	 $scope.onChange = function(data){
	 	$scope.$applyAsync(function(){
	 		$scope.inputData = data;
	 		$scope.salesData = [
		{hour: 1,sales: $scope.inputData},
		{hour: 2,sales: 66},
		{hour: 3,sales: 77},
		{hour: 4,sales: 70},
		{hour: 5,sales: 60},
		{hour: 6,sales: 63},
		{hour: 7,sales: 55},
		{hour: 8,sales: 47},
		{hour: 9,sales: 55},
		{hour: 10,sales: 30}
	];
	 		console.log(data);
	 	});
	 }

	 $scope.inputData = 54;
	$scope.salesData = [
		{hour: 1,sales: $scope.inputData},
		{hour: 2,sales: 66},
		{hour: 3,sales: 77},
		{hour: 4,sales: 70},
		{hour: 5,sales: 60},
		{hour: 6,sales: 63},
		{hour: 7,sales: 55},
		{hour: 8,sales: 47},
		{hour: 9,sales: 55},
		{hour: 10,sales: 30}
	];

});

app.directive("chart", function($window) {
	return {
		restrict: 'E',
		scope: {
			data: '='
		},
		link: function (scope, element) {
			var margin = {top: 20, right: 20, bottom: 30, left: 40},
				width = 480 - margin.left - margin.right,
				height = 360 - margin.top - margin.bottom;

			var svg = d3.select(element[0])
				.append("svg")
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
			var y = d3.scale.linear().range([height, 0]);

			var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom");

			var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left")
				.ticks(10, "%");

			scope.render = function(data) {
          
			}

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
					.call(xAxis);

				//Render Y axis
				svg.append("g")
					.attr("class", "y axis")
					.call(yAxis)
					.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", 6)
					.attr("dy", ".71em")
					.style("text-anchor", "end")
					.text("Count");
	  
	  
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
			};
		}
	};
});