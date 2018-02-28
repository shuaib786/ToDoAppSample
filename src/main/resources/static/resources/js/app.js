'use strict';

var AngularSpringApp = {};

var App = angular.module('AngularSpringApp', ['AngularSpringApp.filters', 'AngularSpringApp.service', 'AngularSpringApp.directives', 'ngRoute', 'ui.bootstrap', 'ngTable', 'ui.ace', 'nvd3ChartDirectives']);

// Declare app level module which depends on filters, and service
App.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/todo', {
        templateUrl: 'resources/view/layout.html',
        controller: TodoController
    });
    $routeProvider.when('/index', {
        templateUrl: 'resources/view/layout.html',
        controller: TodoController
    });

    $routeProvider.otherwise({redirectTo: '/todo'});
}]);
