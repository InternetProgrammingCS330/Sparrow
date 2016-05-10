var app = angular.module('navBarApp',['ngMaterial']);

var CLIENT_ID = '403395753267-0vbv21q2j00qcf47thho0ukqs05oohgs.apps.googleusercontent.com';
var CLIENT_SECRET = 'VKl854VxVa8d-jWn4o94ru3t';
var apiKey = 'AIzaSyBweB8JeMXGhfIInSZF9ve8x_wN-iwVVnE';
var SCOPES = ['https://www.googleapis.com/auth/plus.login',
		'https://www.googleapis.com/auth/userinfo.email',
		'https://www.googleapis.com/auth/gmail.readonly',
		'https://www.googleapis.com/auth/userinfo.profile'
];

function handleClientLoad() {
	gapi.client.setApiKey(apiKey);
	window.setTimeout(checkAuth,1);
}

function checkAuth() {
	gapi.auth.authorize(
	{
		'client_id': CLIENT_ID,
		'scope': SCOPES.join(' '),
		'immediate': true
	}, handleAuthResult);
}

function handleAuthResult(authResult) {
	var authorizeButton = document.getElementById('authorize-button');
	// if (authResult && !authResult.error && authResult.hd == "luther.edu") { // USED FOR LUTHER-ONLYs
	if (authResult && !authResult.error) {
		authorizeButton.style.visibility = 'hidden';
		init();
	} else {
		// gapi.auth.signOut(); // USED FOR LUTHER-ONLY
		authorizeButton.style.visibility = '';
		authorizeButton.onclick = handleAuthClick;
	}
}

function handleAuthClick(event) {
	gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: false}, handleAuthResult);
	return false;
}

var init = function() {
	window.initGapi();
}

app.controller('NavBarCtrl',function($state,$rootScope,$timeout, $scope, $http, $location,
							$mdSidenav,	$mdDialog, $animate, $filter, $window, gapiService) {

	$scope.onSearch = function(searchValue) {
      $scope.search = searchValue;
      $rootScope.search = $scope.search;
      console.log(searchValue);

    };

    $scope.getProfileIcon = function(){
    	console.log($rootScope.user.profpic)
		return $rootScope.user.profpic
	}

	$scope.addProject = function(ev){

		$mdDialog.show({
		  controller: addProjectModalCtrl,
		  templateUrl: 'static/partials/addProject/addProject.html',
		  parent: angular.element(document.body),
		  targetEvent: ev,
		  clickOutsideToClose:true,
		  scope: $scope.$new()
		})
	}

	$scope.toProfile = function(){
		$location.url("/userview");
		$rootScope.userRefreshState = true;
		$rootScope.userRefresh();
	}

	$scope.home = function(){
		$location.url("/");
	}

	function getUser(){
		$rootScope.userRefreshState = false;
		$rootScope.user = {};
		$rootScope.user.ready = false;
		var request = gapi.client.plus.people.get({
			'userId': 'me'
		});
		request.execute(function(resp) {
			$scope.$applyAsync(function(){
				$rootScope.user.profpic = resp.image.url;
				$rootScope.user.fullName = resp.displayName;
				$rootScope.user.firstName = resp.name.givenName;
				$rootScope.user.lastName = resp.name.familyName;
				$rootScope.user.email = resp.emails[0].value;
				$rootScope.user.ready = true;

				$http({
			      	url: '/checkUser',
			      	method: "POST",
			      	headers: { 'Content-Type': 'application/json' },
			      	data: JSON.stringify($rootScope.user)
			    }).success(function(data) {
			    	console.log($state.current)
			    	if($state.current.name == 'index.projectlist'){
			    		$rootScope.refreshProjectList();
			    	}
			    	else{
			    		$rootScope.userRefresh();
			    	}
			    });
			});
		});
	}

	var postInitiation = function() {
		$rootScope.loginAccepted = true;
		getUser();
	}
	
	$window.initGapi = function() {
		gapiService.initGapi(postInitiation);
	}
});

app.service('gapiService', function() {
	this.initGapi = function(postInitiation) {
		gapi.client.load('plus', 'v1', postInitiation);
	}
});

function addProjectModalCtrl($state,$scope, $rootScope, $http, $mdDialog) {


	$scope.submitProject = function(){
		$scope.project.email = $rootScope.user.email;
		$scope.project.userFullName = $rootScope.user.fullName;
		$scope.project.firstName = $rootScope.user.firstName;
		$scope.project.LastName = $rootScope.user.lastName;
		$scope.project.department = $scope.selectedItem.department_name;
		$scope.project.description = $rootScope.getContent();
		console.log("DEScription",$scope.project.description)
		// var delimKey = 
		$scope.project.key = $scope.selectedKeyword;


		// $scope.project.keywords = 

		$http({
	      	url: '/addProject',
	      	method: "POST",
	      	headers: { 'Content-Type': 'application/json' },
	      	data: JSON.stringify($scope.project)
	    }).success(function(data) {
	      	$rootScope.projectList = data.list;
	      	$mdDialog.cancel();
	      	if($state.current.name == 'index.projectlist'){
	    		$rootScope.refreshProjectList();
	    	}
	    	else{
	    		$rootScope.userRefreshState = true;
				$rootScope.userRefresh();
	    	}
	    });
	}

  //   $http({
  //     	url: '/listKeywords',
  //     	method: "GET",
  //     	headers: { 'Content-Type': 'application/json' }
  //   }).success(function(data) {
  //     	$scope.$applyAsync(function(){
		// 		$rootScope.keywords = data.list;
		// 		console.log("hihihi" + data.list);
		// 		console.log("heree " + $rootScope.keywords);
		// 		console.log("test " + $scope.selectedKeyword );
		// });
  //   });

  	$scope.selectedKeyword = [];

	$scope.errorMessage = "";

	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};

    $scope.selectedItem  = null;
    $scope.searchText    = null;
    $scope.querySearch   = $scope.querySearch;

    $scope.querySearch = function(query) {
      var results = query ? $rootScope.Departments.filter( createFilterFor(query) ) : [];
      return results;
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(department) {
        return (department.department_name.indexOf(query.toLowerCase()) === 0);
      };
    }
};