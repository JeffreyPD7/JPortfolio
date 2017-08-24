
var app = angular.module('portfolioApp', ['ngRoute','ngAnimate','firebase','chart.js','ngMaterial',
                                        'ngMessages','angulartics','angulartics.google.analytics']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            template: '<home></home>',
            controller: 'homeController'
        })
        .when('/about', {
            template: '<about></about>',
            controller: 'aboutController'
        })
        .when('/skills', {
            template: '<skills></skills>',
            controller: 'skillsController'
        })
        .when('/contact', {
            template: '<contact></contact>',
            controller: 'contactController'
        })
        .when('/projects', {
            template: '<projects></projects>',
            controller: 'projectsController'
        })
        .otherwise('/home');
});
