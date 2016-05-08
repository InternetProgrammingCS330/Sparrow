var app = angular.module('projectApp',['ngMaterial']);

app.controller('projectCtrl', ['$rootScope',
	'$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog','$animate','$filter',
	function($rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog,$animate,$filter) {

	console.log("HELLO FROM THE projectCtrl");

    $scope.goHome = function() {
	    $location.url("/");
    }

    function refresh(){
		$http({
	      	url: '/showProject',
	      	method: "GET",
	      	headers: { 'Content-Type': 'application/json' }
	    }).success(function(data) {
	      	$scope.$applyAsync(function(){
				$rootScope.projectList = data.list;
				console.log("projectDetails:", $rootScope.projectList);
			});
	    });
	}

	refresh();


}]);