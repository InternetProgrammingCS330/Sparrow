var app = angular.module('projectApp',['ngMaterial']);

app.controller('projectCtrl', ['$rootScope',
	'$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog','$animate','$filter',
	function($rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog,$animate,$filter) {

	$scope.back = function(){
		$location.url("/");
	}

	$scope.edit = function() {
		$location.url("/projectEdit/pid="+$rootScope.currentProject.projectID);
	}
	function currentProject() {
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
	      	$rootScope.currentProject = data.list[0];
	      	var el = document.getElementById("viewDescription");
	      	el.insertAdjacentHTML ("beforeBegin", $rootScope.currentProject.description);

	      	console.log(compress($rootScope.currentProject.description))

	      	if($rootScope.currentProject.email == $rootScope.user.email){
	      		$rootScope.viewOnly = false;
	      	}
	      	else{
	      		$rootScope.viewOnly = true;
	      	}
	    });
	}
	refresh();

}]);