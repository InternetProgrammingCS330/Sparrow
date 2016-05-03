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

	$scope.data = [
     {"age":"<5","population":"2704659"},
     {"age":"5-13","population":"4499890"},
     {"age":"14-17","population":"2159981"},
     {"age":"18-24","population":"3853788"},
     {"age":"25-44","population":"14106543"},
     {"age":"45-64","population":"8819342"},
     {"age":"=65","population":"612463"}
]

});