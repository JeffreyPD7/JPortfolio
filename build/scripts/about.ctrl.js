(function () {

    "use strict";

    angular
        .module('portfolioApp').component('about', {
            templateUrl: 'pages/about.tpl.html'})

        .controller('aboutController', ['$scope', '$location', function ($scope, $location) {
            $scope.aboutPageLeave = function (page) {
                $('.home').css('animation', 'slideInUp 1s ease-in');
                $location.path(page);
            };

            $scope.pageClass = 'about';

            $(".about_-_selfPortrait").fadeTo(4000, 1);
            $(".about_-_bio").fadeTo(4000, 1);
        }]);
})();
