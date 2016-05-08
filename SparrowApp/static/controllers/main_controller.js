'use strict';

angular.module('projectListApp',[]);
angular.module('projectApp',[]);
angular.module('userApp',[]);
angular.module('navBarApp',[]);
angular.module('searchProjectApp',[]);
angular.module('statsApp',[]);

var myApp = angular.module('SparrowApp', ['ui.router', 'ngMaterial',
	'projectListApp','projectApp','userApp','navBarApp', 'searchProjectApp', 'statsApp']);

myApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
	function($stateProvider,$urlRouterProvider, $httpProvider) {

		var interceptor = ['$location', '$q', '$injector', function($location, $q, $injector) {
			
			return {
				responseError: function(response) { 
					if (response.status === 401){
						console.log("4010401401401");
						$location.url('/');
					}
					return $q.reject(response); 
				} 
			};
		}];

		$httpProvider.interceptors.push(interceptor);

		$stateProvider
			.state('index', {
				abstract: true,
				// url: '/',
				views: {
					'main' : {
						templateUrl: 'static/partials/tpl/main/layoutIL.html',
						action: 'indexApp.rootController'
					},
					// 'top@index' : { templateUrl: 'static/partials/tpl/main/tpl.top.html',},
					// 'main@index' : { templateUrl: 'static/partials/tpl/main/tpl.main.html',},
					// 'right@index' : { templateUrl: 'static/partials/tpl/main/tpl.main.html',},
				},
			})
			.state('index.projectlist', {
				parent:'index',
				url:'/',
				views: {
					'top@index': {
						templateUrl : 'static/partials/navBar/navBar.html',
						action : 'navBarApp.NavBarCtrl'
					},
					'main1@index': {
						templateUrl : 'static/partials/projectList/projectList.html',
						action : 'projectListApp.projectListCtrl'
					},
					'right@index': {
						templateUrl : 'static/partials/stats/statsGlobal.html',
						action : 'statsApp.StatsCtrl'
					}
				}
			})

			.state('index.projectView', {
				parent:'index',
				url:'/projectView',
				views: {
					'top@index': {
						templateUrl : 'static/partials/navBar/navBar.html',
						action : 'navBarApp.NavBarCtrl'
					},
					'main1@index': {
						templateUrl : 'static/partials/projectView/projectView.html',
						action : 'projectViewApp.projectViewCtrl'
					},
					// 'right@index': {
					// 	templateUrl : 'static/partials/stats/statsGlobal.html',
					// 	action : 'statsApp.StatsCtrl'
					// }
				}
			})

			.state('index.userview', {
				parent:'index',
				url:'/userview',
				views: {
					'top@index': {
						templateUrl : 'static/partials/navBar/navBar.html',
						action : 'navBarApp.NavBarCtrl'
					},
					'main1@index': {
						templateUrl : 'static/partials/userView/userView.html',
						action : 'userApp.UserCtrl'
					},
					'right@index': {
						templateUrl : 'static/partials/stats/statsUser.html',
						action : 'statsApp.StatsCtrl'
					}
				}
			})

			$urlRouterProvider.when('','/');
	}
]);


myApp.service('sharedService',function($rootScope) {
	return{
		refreshMain: function(){
			$rootScope.$broadcast('handleBroadcast');
		}
	};
});

myApp.service('sharedProperties',function(){
	var property = {nice:'First'};

	return {
		getProperty: function () {
			return property;
		},
		setProperty: function(value) {
			property = value;
		}
	};
});