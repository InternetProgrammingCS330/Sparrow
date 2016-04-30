var app = angular.module('navBarApp',['ngMaterial']);

var CLIENT_ID = '403395753267-0vbv21q2j00qcf47thho0ukqs05oohgs.apps.googleusercontent.com';
var CLIENT_SECRET = 'VKl854VxVa8d-jWn4o94ru3t';
var apiKey = 'AIzaSyBweB8JeMXGhfIInSZF9ve8x_wN-iwVVnE';
var SCOPES = ['https://www.googleapis.com/auth/plus.login',
		'https://www.googleapis.com/auth/userinfo.email',
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
    if (authResult && !authResult.error) {
        authorizeButton.style.visibility = 'hidden';
        init();
    } else {
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

app.controller('NavBarCtrl',function($rootScope,$timeout, $scope, $http, $location,
							$mdSidenav,	$mdDialog, $animate, $filter, $window, gapiService) {

    console.log("HELLO FROM THE navBarCtrl");

    $scope.addProject = function(){
    	console.log("ADDING PROJECT");
    	$http.get("/addProject/"+"hell").success(function(response){
	      	console.log(response);
	    });
    }

    $scope.toProfile = function(){
		console.log("To Profile Page");
		$location.url("/userview");
	}

	$scope.home = function(){
		console.log("To Home Page");
		$location.url("/");
	}

    var postInitiation = function() {
		console.log("authorized");
	}
	$window.initGapi = function() {
	    gapiService.initGapi(postInitiation);
	}
});

app.service('gapiService', function() {
	this.initGapi = function(postInitiation) {
		gapi.client.load('gmail', 'v1', postInitiation);
	}
});