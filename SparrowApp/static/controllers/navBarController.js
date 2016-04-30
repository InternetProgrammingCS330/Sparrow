var app = angular.module('navBarApp',['ngMaterial']);

var CLIENT_ID = '403395753267-m5bosciaf32n6tmr4otncqigvfd3b2lr.apps.googleusercontent.com';
var apiKey = 'AIzaSyAQSFbNgx0Xs-faGH6o2YxTrlQe9Ds-d94';
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly',
	'https://www.googleapis.com/auth/gmail.send',
	'https://www.googleapis.com/auth/gmail.modify',
	'https://www.googleapis.com/auth/gmail.compose'
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