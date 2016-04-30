var app = angular.module('navBarApp',['ngMaterial']);

app.controller('NavBarCtrl', ['$rootScope',
  '$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog','$animate','$filter',
  function($rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog,$animate,$filter) {

    console.log("HELLO FROM THE navBarCtrl");

}]);