var app = angular.module('userApp',['ngMaterial']);

app.controller('UserCtrl', ['$rootScope',
  '$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog','$animate','$filter',
  function($rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog,$animate,$filter) {
  	$rootScope.mainView = false;
    console.log("HELLO FROM THE userCtrl");

    var cw = $('.child').width();
	$('.child').css({
	    'height': cw + 'px'
	});

    console.log("HELLO FROM THE projectListCtrl");

    function refresh(){
		console.log("REFRESHING");

		$http({
	      	url: '/listAllProjects',
	      	method: "GET",
	      	headers: { 'Content-Type': 'application/json' }
	    }).success(function(data) {
	      	console.log(data.list);
	      	$scope.$applyAsync(function(){
				$rootScope.projectList = data.list;
				console.log("HERE");
				console.log($rootScope.projectList);
			});
	    });

	    $http({
	      	url: '/listDepartments',
	      	method: "GET",
	      	headers: { 'Content-Type': 'application/json' }
	    }).success(function(data) {
	      	console.log(data.list);
	      	$scope.$applyAsync(function(){
  				$rootScope.Departments = data.list;
			});
	    });
	}

	refresh();

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
	
}]);