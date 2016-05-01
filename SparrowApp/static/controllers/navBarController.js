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
	console.log(authResult)
	var authorizeButton = document.getElementById('authorize-button');
	if (authResult && !authResult.error && authResult.hd == "luther.edu") {
		authorizeButton.style.visibility = 'hidden';
		init();
	} else {
		if(authResult.hd != "luther.edu"){
			console.log("Please use you luther email");
		}
		else{
			authorizeButton.style.visibility = '';
			authorizeButton.onclick = handleAuthClick;
		}
	}
}

function handleAuthClick(event) {
	gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: false}, handleAuthResult);
	return false;
}

var init = function() {
	window.initGapi();
}

app.controller('NavBarCtrl',function($rootScope,$timeout, $scope, $http, $location,
							$mdSidenav,	$mdDialog, $animate, $filter, $window, gapiService) {

	console.log("HELLO FROM THE navBarCtrl");

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
		console.log("To Profile Page");
		$location.url("/userview");
	}

	$scope.home = function(){
		console.log("To Home Page");
		$location.url("/");
	}

	function getUser(){
		$rootScope.user = {};
		$rootScope.user.ready = false;
		var request = gapi.client.plus.people.get({
			'userId': 'me'
		});
		request.execute(function(resp) {
			console.log("RESPONSE",resp);
			console.log(resp.image.url);
			$scope.$applyAsync(function(){
				$rootScope.user.profpic = resp.image.url;
				$rootScope.user.fullName = resp.displayName;
				$rootScope.user.firstName = resp.name.givenName;
				$rootScope.user.lastName = resp.name.familyName;
				$rootScope.user.email = resp.emails[0].value;
				$rootScope.user.ready = true;	    		
			});
			
		});
	}

	var postInitiation = function() {
		console.log("authorized");
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

function addProjectModalCtrl($scope, $rootScope, $http, $mdDialog) {

	console.log("HELLO ADDPROJECTMODALCTRL");

	$scope.submitProject = function(){
		console.log("ADDING PROJECT", $scope.project);

		$scope.project.email = $rootScope.user.email;
		$scope.project.userFullName = $rootScope.user.fullName;
		$scope.project.firstName = $rootScope.user.firstName;
		$scope.project.LastName = $rootScope.user.lastName;

		$http({
	      	url: '/addProject',
	      	method: "POST",
	      	headers: { 'Content-Type': 'application/json' },
	      	data: JSON.stringify($scope.project)
	    }).success(function(data) {
	      	console.log(data);
	      	$rootScope.projectList = data.list;
	      	$mdDialog.cancel();
	    });
	}

	$scope.errorMessage = "";

	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		console.log("cancel");
		$mdDialog.cancel();
	};
	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};

};