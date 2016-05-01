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
			});
	    });
	}

	refresh();
	
}]);