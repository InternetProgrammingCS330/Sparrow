var app = angular.module('textEditApp',['ngMaterial','ui.tinymce']);

app.controller('TextEditCtrl', ['$rootScope',
	'$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog','$animate','$filter',
	function($rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog,$animate,$filter) {

  	console.log("EDITOR PAGE");


  $scope.tinymceModel = 'Initial content';

  $scope.getContent = function() {
    return $scope.tinymceModel;
  };

  $scope.setContent = function() {
    $scope.tinymceModel = 'Time: ' + (new Date());
  };

  tinymce.PluginManager.add('menusave', function(editor, url) {
      editor.addMenuItem('menusave', {
          text: 'Save',
          context: 'file',
          onclick: function() {
              $('.mce-i-save').closest('button').trigger('click');
              console.log($scope.getContent())
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
    save_onsavecallback: function () { console.log('Saved'); },
    save_oncancelcallback: function () { console.log('Save canceled'); },
    save_enablewhendirty: true
  };
	
}]);