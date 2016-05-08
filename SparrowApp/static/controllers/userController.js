var app = angular.module('userApp',['ngMaterial']);

app.controller('UserCtrl', ['$rootScope',
  '$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog','$animate','$filter',
  function($rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog,$animate,$filter) {
  	$rootScope.mainView = false;

	$rootScope.total = {};
	$rootScope.total.length = 0;

    var cw = $('.child').width();
	$('.child').css({
	    'height': cw + 'px'
	});

    function refresh(){

		$http({
	      	url: '/listUserProjects',
	      	method: "POST",
	      	headers: { 'Content-Type': 'application/json' },
	      	data: JSON.stringify($rootScope.user.email)
	    }).success(function(data) {
	      	$scope.$applyAsync(function(){
				$rootScope.projectList = data.list;
				$rootScope.totalCount = data.total[0].totalCount
				$scope.dataSource = data.counts;
				$scope.userCards[0].value = data.list.length;
				console.log($rootScope.totalCount)
			});
	    });

	    $http({
	      	url: '/listDepartments',
	      	method: "GET",
	      	headers: { 'Content-Type': 'application/json' }
	    }).success(function(data) {
	      	$scope.$applyAsync(function(){
  				$rootScope.Departments = data.list;
			});
	    });
	}

	refresh();

	$rootScope.totalCount = 5;

	$scope.userCards = [
	{ 
		"title" : "Total Projects",
		"value" : $rootScope.totalCount
	},
	{ 
		"title" : "Your Interests",
		"value" : "2"
	},
	{ 
		"title" : "Blank",
		"value" : "3"
	}];

	$scope.dateSample = [
	    {"date":"1-May-12","close":"612.33"},
	    {"date":"30-Apr-12","close":"513.93"},
	    {"date":"27-Apr-12","close":"693.00"},
	    {"date":"26-Apr-12","close":"680.50"},
	    {"date":"25-Apr-12","close":"630.33"},
	    {"date":"24-Apr-12","close":"615.33"},
	    {"date":"23-Apr-12","close":"600.33"},
	    {"date":"22-Apr-12","close":"585.33"},
	    {"date":"21-Apr-12","close":"570.33"},
	    {"date":"20-Apr-12","close":"555.00"},
	    {"date":"19-Apr-12","close":"540.00"},
	    {"date":"18-Apr-12","close":"525.00"},
	    {"date":"17-Apr-12","close":"510.00"},
	    {"date":"16-Apr-12","close":"495.00"},
	    {"date":"15-Apr-12","close":"480.00"}
	]

	$scope.xAxis = "hour"

	$scope.test = function(btnName) {
		switch(btnName) {
		case "Total Projects":
			$scope.dataSource = [
			    {hour:1,sales:9},
				{hour:2,sales:7},
				{hour:3,sales:12},
			    {hour:4,sales:3}
			]
			break;
		case "Your Interests": 
			$scope.dataSource = [
			    {hour:1,sales:4},
				{hour:2,sales:3},
				{hour:3,sales:2},
			    {hour:4,sales:1}
			]
			break;
		case "Blank": 
			$scope.dataSource = [
			    {hour:1,sales:7},
				{hour:2,sales:3},
				{hour:3,sales:2},
			    {hour:4,sales:5}
			]
			break;
		}
	}

}]);