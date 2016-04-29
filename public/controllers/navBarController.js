var app = angular.module('navBarApp',['ngMaterial']);

app.controller('navBarCtrl', ['$rootScope',
  '$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog','$animate','$filter',
  function($rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog,$animate,$filter) {

    console.log("HELLO FROM THE navBarCtrl");

}]);