var app = angular.module('projectEditApp',['ngMaterial','ui.tinymce']);

app.controller('projectEditCtrl', ['$state','$rootScope',
	'$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog','$animate','$filter',
	function($state,$rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog,$animate,$filter) {

  var curPID = $location.absUrl().split("=")[1];

  $scope.refreshEdit = function(){
    $http({
          url: '/getEdit',
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          data:curPID
      }).success(function(data) {
          $scope.$applyAsync(function(){
            $rootScope.editingProject = data.project[0];
            $scope.setContent();
      });
    });
  }

  $scope.refreshEdit();  

  $rootScope.getContent = function() {
    return $scope.tinymceModel;
  };

  $scope.setContent = function() {
    $scope.tinymceModel = $rootScope.editingProject.description;
  };

  tinymce.PluginManager.add('menusave', function(editor, url) {
      editor.addMenuItem('menusave', {
          text: 'Save',
          context: 'file',
          onclick: function() {
              $('.mce-i-save').closest('button').trigger('click');
          }
      });
  });

  $scope.tinymceOptions = {
    selector: 'textarea',
    height: 500,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table contextmenu paste save menusave'
    ],
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | save',
    content_css: [
      '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
      '//www.tinymce.com/css/codepen.min.css'
    ],
    save_onsavecallback: function() {$('.mce-i-save').closest('button').trigger('click');},
    save_oncancelcallback: function () { console.log('Save canceled'); },
    save_enablewhendirty: true
  };

  $scope.tinymceOptionsAdd = {
    resize:false,
    selector: 'textarea',
    height: 250,
    width:500,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks fullscreen',
      'insertdatetime media table contextmenu paste'
    ],
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    content_css: [
      '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
      '//www.tinymce.com/css/codepen.min.css'
    ],
    save_onsavecallback: function() {$('.mce-i-save').closest('button').trigger('click');},
    save_oncancelcallback: function () { console.log('Save canceled'); },
    save_enablewhendirty: true
  };
	
}]);