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

  function compress(s) {
    var i, l, out='';
    if (s.length % 2 !== 0) s += ' ';
    for (i = 0, l = s.length; i < l; i+=2) {
      out += String.fromCharCode((s.charCodeAt(i)*256) + s.charCodeAt(i+1));
    }
    return String.fromCharCode(9731)+out;
  }

  function decompress(s) {
    var i, l, n, m, out = '';
    if (s.charCodeAt(0) !== 9731) return s;
    for (i = 1, l = s.length; i < l; i++) {
      n = s.charCodeAt(i);
      m = Math.floor(n/256);
      out += String.fromCharCode(m, n%256);
    }
    return out;
  }

  $scope.save = function(){

    console.log("SAVING");

    $rootScope.editingProject.description = $rootScope.getContent();

    $http({
          url: '/saveEdit',
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          data:$rootScope.editingProject
      }).success(function(data) {
          $scope.$applyAsync(function(){
            $location.url("/");
          });
    });
  }
  $scope.cancel = function(){
    $location.url("/");
  }

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