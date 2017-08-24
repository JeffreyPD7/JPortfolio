(function () {

    "use strict";

    angular
        .module('portfolioApp').component('skills', {
            templateUrl: 'pages/skills.tpl.html'
            })

        .controller('skillsController',
            function ($scope, $location, $firebaseArray, firebaseFac) {
                $scope.skillsPageLeave = function (page) {
                    // console.log('you clicked');
                    $('.home').css('animation', 'slideInLeft 1s ease-in');
                    $location.path(page);
                };

                $scope.pageClass = 'skills';

                $(".skills__title").fadeTo(3000, 1);
                $(".skills_-_horizontal-bar-chart").fadeTo(3000, 1);
                $(".skills_-_doughnut-chart").fadeTo(3000, 1);
                $(".skills_-_radar-chart").fadeTo(3000, 1);

            });

})();
