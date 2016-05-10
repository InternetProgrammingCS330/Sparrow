var app = angular.module('projectListApp',['ngMaterial']);

app.controller('projectListCtrl', ['$state','$rootScope',
  '$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog','$animate','$filter',
  function($state,$rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog,$animate,$filter) {
  	
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

    $scope.viewProject = function(proj) {
		$location.url("/projectView/pid="+proj.projectID);
    }

    $scope.checked = function(projectID){
    	var toLike = {
    		projectID:projectID,
    		email:$rootScope.user.email
    	}
    	console.log("LIKE", $rootScope.user.email)
    	$http({
	      	url: '/addLike',
	      	method: "POST",
	      	headers: { 'Content-Type': 'application/json' },
	      	data: JSON.stringify(toLike)
	    }).success(function(data) {
	    	$scope.$applyAsync(function(){
				$rootScope.projectList = data.list;
				console.log("NEW LIKES",data)
	    	});
	    });
    }

    $rootScope.refreshProjectList = function(){
		console.log("REFRESHING");

		$http({
	      	url: '/listAllProjects',
	      	method: "POST",
	      	headers: { 'Content-Type': 'application/json' },
	      	data: JSON.stringify($rootScope.user)
	    }).success(function(data) {
	      	$scope.$applyAsync(function(){
				$rootScope.projectList = data.list;
				console.log("ProjectList:", $rootScope.projectList);
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
	      	$scope.$applyAsync(function(){
  				$rootScope.Departments = data.list;
			});
	    });
	}
	
}]);