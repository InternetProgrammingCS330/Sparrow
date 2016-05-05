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

	    angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
		.controller('SwitchDemoCtrl', function($scope) {
		  $scope.data = {
		    cb1: true,
		    cb4: true,
		    cb5: false
		  };

		  $scope.message = 'false';

		  $scope.onChange = function(cbState) {
		  	$scope.message = cbState;
		  };
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