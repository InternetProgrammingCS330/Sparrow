var app = angular.module('projectApp',['ngMaterial']);

app.controller('projectCtrl', ['$rootScope',
	'$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog','$animate','$filter',
	function($rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog,$animate,$filter) {

	console.log("HELLO FROM THE projectCtrl");

	function currentProject() {
		console.log("PROJID:",(window.location.hash).split("=")[1]);
		return (window.location.hash).split("=")[1];
	}

    $scope.goHome = function() {
	    $location.url("/");
    }

    function refresh(){
		$http({
	      	url: '/showProject',
	      	method: "POST",
	      	headers: { 'Content-Type': 'application/json' },
	      	data: currentProject()
	    }).success(function(data) {
	      	// $rootScope.currentProject = data.list[0];
	      	$scope.currentProject = data.list[0];
	      	console.log($scope.currentProject);
	    });
	}
	refresh();
}]);