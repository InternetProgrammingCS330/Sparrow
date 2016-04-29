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
                        $location.url('/');
                    }
                    if (response.status === 404){
                        $location.url('/404');
                    }
                    if (response.status === 454){
                        $location.url('/itemlist');
                    } 
                    return $q.reject(response); 
                } 
            };
        }];

        $httpProvider.interceptors.push(interceptor);

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('projectlist', {
                url:'/projectlist',
                views: {
                    'navBar': {
                        templateUrl : '../partials/navBar/navBar.html',
                        action : 'navBarApp.NavBarCtrl'
                    },
                    'projectlist': {
                        templateUrl : '../partials/projectList/projectList.html',
                        action : 'projectListApp.projectListCtrl'
                    }
                }
            })

            .state('userView', {
                url:'/userview',
                views: {
                    'navBar': {
                        templateUrl : '../partials/navBar/navBar.html',
                        action : 'navBarApp.NavBarCtrl'
                    },
                    'userPage': {
                        templateUrl : '../partials/userView/userView.html',
                        action : 'userApp.userCtrl'
                    }
                    'sideNav': {
                        templateUrl : '../partials/stats/stats.html',
                        action : 'statsApp.statsCtrl'
                    }
                }
            })



            $urlRouterProvider.when('','/');

            $urlRouterProvider.otherwise('/404');

        var interceptor = ['$location', '$q', '$injector', function($location, $q, $injector) {

            return {
                response: function(response) {
                    return response; 
                },
                responseError: function(response) { 
                    if (response.status === 401){
                        $location.url('/login');
                    }
                    if (response.status === 404){
                        $location.url('/404');
                    } 
                    return $q.reject(response); 
                } 
            };
        }];
        $httpProvider.interceptors.push(interceptor);
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