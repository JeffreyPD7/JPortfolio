(function () {

    "use strict";

    angular
        .module('portfolioApp').component('home', {
        templateUrl: 'pages/home.tpl.html'})

        .controller('homeController',['$scope', '$location', function($scope, $location) {
            $scope.aboutPageEnter = function (page) {
                // console.log('you clicked');
                $('.home').css('animation','slideOutDown 1s ease-in');
                $location.path(page);
            };

            $scope.skillsPageEnter = function (page) {
                // console.log('you clicked');
                $('.home').css('animation','slideOutLeft 1s ease-in');
                $location.path(page);
            };

            $scope.contactPageEnter = function (page) {
                // console.log('you clicked');
                $('.home').css('animation','slideOutUp 1s ease-in');
                $location.path(page);
            };

            $scope.projectsPageEnter = function (page) {
                // console.log('you clicked');
                $('.home').css('animation','slideOutRight 1s ease-in');
                $location.path(page);
            };

            $scope.pageClass = 'home';

        }]);

})();
