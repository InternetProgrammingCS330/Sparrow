var app = angular.module('userApp',['ngMaterial']);

app.controller('UserCtrl', ['$rootScope',
  '$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog','$animate','$filter',
  function($rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog,$animate,$filter) {
  	$rootScope.mainView = false;

    var cw = $('.child').width();
	$('.child').css({
	    'height': cw + 'px'
	});


	$scope.userCards = [
	{ 
		"title" : "Total Projects",
		"value" : "1"
	},
	{ 
		"title" : "Your Interests",
		"value" : "2"
	},
	{ 
		"title" : "Blank",
		"value" : "3"
	}];

    function refresh(){

		$http({
	      	url: '/listUserProjects',
	      	method: "GET",
	      	headers: { 'Content-Type': 'application/json' }
	    }).success(function(data) {
	      	$scope.$applyAsync(function(){
				$rootScope.projectList = data.list;
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

	$scope.dataSource = [
		{"date":"1-May-12","close":"612.33"},
		{"date":"25-Apr-12","close":"630.33"},
		{"date":"19-Apr-12","close":"540.00"}]

	$scope.test = function(btnName) {
		switch(btnName) {
		case "Total Projects":
			$scope.dataSource = [
			    {"date":"1-May-12","close":"612.33"},
				{"date":"25-Apr-12","close":"630.33"},
				{"date":"19-Apr-12","close":"540.00"},
			    {"date":"16-Apr-12","close":"495.00"}
			]
			break;
		case "Your Interests": 
			$scope.dataSource = [
			    {"date":"27-Apr-12","close":"693.00"},
			    {"date":"20-Apr-12","close":"555.00"},
			    {"date":"19-Apr-12","close":"540.00"},
			    {"date":"18-Apr-12","close":"525.00"}
			]
			break;
		case "Blank": 
			$scope.dataSource = [
			    {"date":"26-Apr-12","close":"680.50"},
			    {"date":"25-Apr-12","close":"630.33"},
			    {"date":"16-Apr-12","close":"495.00"},
			    {"date":"15-Apr-12","close":"480.00"}
			]
			break;
		}
	}

}]);