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

    $rootScope.userRefresh = function(){

		$http({
	      	url: '/listUserProjects',
	      	method: "POST",
	      	headers: { 'Content-Type': 'application/json' },
	      	data: JSON.stringify($rootScope.user.email)
	    }).success(function(data) {
	      	$scope.$applyAsync(function(){
				$rootScope.projectListUser = data.yourProjectList;

				$rootScope.yourProjectsCount = data.yourProjectsTotal[0].yourProjectsCount
				$rootScope.yourInterestsCount = data.yourInterestsTotal[0].yourInterestsCount
				$rootScope.totalCount = data.total[0].totalCount

				$rootScope.dataSource = data.yourProjectCounts;
				console.log(data)
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

	$rootScope.yourProjectsCount = 5;

	if($rootScope.userRefreshState){
		$rootScope.userRefresh();
	}

	$scope.xAxis = "hour"

	$scope.test = function(btnName) {
		switch(btnName) {
		case "Total Projects":
			$scope.dataSource = [
			    {time:1,count:9},
				{time:2,count:7},
				{time:3,count:12},
			    {time:4,count:3}
			]
			break;
		case "Your Interests": 
			$scope.dataSource = [
			    {time:1,count:4},
				{time:2,count:3},
				{time:3,count:2},
			    {time:4,count:1}
			]
			break;
		case "Blank": 
			$scope.dataSource = [
			    {time:1,count:7},
				{time:2,count:3},
				{time:3,count:2},
			    {time:4,count:5}
			]
			break;
		}
	}

}]);