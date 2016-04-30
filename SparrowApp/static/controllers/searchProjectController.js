var app = angular.module('searchProjectApp',['ngMaterial']);

app.controller('searchProjectCtrl', ['$rootScope',
  '$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog','$animate','$filter',
  function($rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog,$animate,$filter) {

    console.log("HELLO FROM THE searchProjectCtrl");
	
}]);