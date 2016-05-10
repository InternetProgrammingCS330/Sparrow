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

    $scope.test1 = function(data){
    	var el = document.getElementById(data.projectID);
    	$('#'+data.projectID).html(data.description)
    }

    $scope.viewProject = function(proj) {
		$location.url("/projectView/pid="+proj.projectID);
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

		$http({
	      	url: '/listAllProjects',
	      	method: "POST",
	      	headers: { 'Content-Type': 'application/json' },
	      	data: JSON.stringify($rootScope.user)
	    }).success(function(data) {
	      	$scope.$applyAsync(function(){
	      		$scope.projectListCopy = data.list;
				$rootScope.projectList = data.list;
				$rootScope.allDepartmentProjectCountGraph = data.allDepartmentProjectCountGraph;
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

	$rootScope.showDepartment = function(department){
		$scope.$applyAsync(function(){
			$rootScope.projectList = $.grep( $scope.projectListCopy, function( n, i ) {
			  return n.department===department;
			});
		})
	};
	
}]);