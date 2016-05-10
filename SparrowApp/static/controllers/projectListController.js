var app = angular.module('projectListApp',['ngMaterial']);

app.controller('projectListCtrl', ['$state','$rootScope',
  '$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog','$animate','$filter',
  function($state,$rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog,$animate,$filter) {
  	
  	$rootScope.mainView = true; 

   	function transformChip(chip) {
      if (angular.isObject(chip)) {
        return chip;
      }
      return { lowername: chip};
    }

    $scope.viewProject = function(proj) {
		$location.url("/projectView/pid="+proj.projectID);
    }

    function populateDescription(projectID) {
    	for (item in $rootScope.projectList) {
    		if ($rootScope.projectList[item].projectID = projectID) {
    			console.log(document.getElementById("1"));
    			document.getElementById(projectID).innerHTML = $rootScope.projectList.description;
    		}
    	}
    }

    $scope.checked = function(projectID){
    	var toLike = {
    		projectID:projectID,
    		email:$rootScope.user.email
    	}
    	$http({
	      	url: '/addLike',
	      	method: "POST",
	      	headers: { 'Content-Type': 'application/json' },
	      	data: JSON.stringify(toLike)
	    }).success(function(data) {
	    	$scope.$applyAsync(function(){
				$rootScope.projectList = data.list;
	    	});
	    });
    }

    $rootScope.refreshProjectList = function(){
    	console.log(document);
		$http({
	      	url: '/listAllProjects',
	      	method: "POST",
	      	headers: { 'Content-Type': 'application/json' },
	      	data: JSON.stringify($rootScope.user)
	    }).success(function(data) {
	      	$scope.$applyAsync(function(){
				$rootScope.projectList = data.list;
				$scope.projectList = data.list;
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

	if($rootScope.user != null){
		$rootScope.refreshProjectList();
	}
	
}]);