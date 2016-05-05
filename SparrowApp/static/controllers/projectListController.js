var app = angular.module('projectListApp',['ngMaterial']);

app.controller('projectListCtrl', ['$rootScope',
  '$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog','$animate','$filter',
  function($rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog,$animate,$filter) {
  	
  	$rootScope.mainView = true; 

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
	      	url: '/listKeywords',
	      	method: "GET",
	      	headers: { 'Content-Type': 'application/json' }
	    }).success(function(data) {
	      	console.log(data.list);
	      	$scope.$applyAsync(function(){
  				$rootScope.keywords = data.list;
  				console.log("heree " + $rootScope.keywords);
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
	
}]);