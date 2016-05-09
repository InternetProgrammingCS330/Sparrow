var app = angular.module('projectListApp',['ngMaterial']);

app.controller('projectListCtrl', ['$rootScope',
  '$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog','$animate','$filter',
  function($rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog,$animate,$filter) {
  	
  	$rootScope.mainView = true; 




    console.log("HELLO FROM THE projectListCtrl");
    console.log($scope.selectedKeyword);
   	function transformChip(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
      	console.log(chip);
        return chip;
      }

      // Otherwise, create a new one
      return { lowername: chip};
    }

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
	    
	  //   $http({
	  //     	url: '/listKeywords',
	  //     	method: "GET",
	  //     	headers: { 'Content-Type': 'application/json' }
	  //   }).success(function(data) {
	  //     	console.log(data.list);
	  //     	$scope.$applyAsync(function(){
  	// 			$rootScope.keywords = data.list;
  	// 			console.log("heree " + $rootScope.keywords);
			// });
	  //   });




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