var app = angular.module('projectApp',['ngMaterial']);

app.controller('projectCtrl', ['$rootScope',
  '$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog','$animate','$filter',
  function($rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog,$animate,$filter) {

    console.log("HELLO FROM THE projectCtrl");

}]);