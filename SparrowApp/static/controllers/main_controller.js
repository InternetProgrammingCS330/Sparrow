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
            
            console.log("inside interceptor");
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
            .state('projectlist', {
                url:'/',
                views: {
                    'navBar': {
                        templateUrl : 'static/partials/navBar/navBar.html',
                        action : 'navBarApp.NavBarCtrl'
                    },
                    'projectlist': {
                        templateUrl : 'static/partials/projectList/projectList.html',
                        action : 'projectListApp.projectListCtrl'
                    }
                }
            })

            .state('userview', {
                url:'/userview',
                views: {
                    'navBar': {
                        templateUrl : 'static/partials/navBar/navBar.html',
                        action : 'navBarApp.NavBarCtrl'
                    },
                    'userView': {
                        templateUrl : 'static/partials/userView/userView.html',
                        action : 'userApp.userCtrl'
                    },
                    'stats': {
                        templateUrl : 'static/partials/stats/stats.html',
                        action : 'statsApp.statsCtrl'
                    }
                }
            })

            console.log("WE DID SOMETHING");

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