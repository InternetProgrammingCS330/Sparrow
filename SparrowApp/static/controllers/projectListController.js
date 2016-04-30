var app = angular.module('projectListApp',['ngMaterial']);

app.controller('projectListCtrl', ['$rootScope',
  '$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog','$animate','$filter',
  function($rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog,$animate,$filter) {

    console.log("HELLO FROM THE projectListCtrl");
	
}]);