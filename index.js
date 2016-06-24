//require('jquery')
require('angular')
require('angular-aria')
require('angular-animate')
require('angular-material')


angular.module('App', ['ngMaterial']).controller('MyForm',
  ['$scope', function($scope) {
      $scope.title = 'My title';
  }]
);
