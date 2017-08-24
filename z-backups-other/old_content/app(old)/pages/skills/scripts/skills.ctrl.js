(function () {

    "use strict";

    angular
        .module('portfolioApp').component('skills', {
            templateUrl: 'pages/skills/skills.tpl.html'
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
                $(".skills__horizontal-bar-chart").fadeTo(3000, 1);
                $(".skills__doughnut-chart").fadeTo(3000, 1);
                $(".skills__radar-chart").fadeTo(3000, 1);


                // const skillsRef = firebaseFac.child('simehitng');
                // this.ranks = $firebaseArray(ref);
                // console.log(this.ranks);

                // const ref = firebaseFac.child('simehitng');
                // this.ranks = $firebaseArray(ref);
                // console.log(this.ranks);
            });

})();

