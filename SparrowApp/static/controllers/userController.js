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
	
}]);