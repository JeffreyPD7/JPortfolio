(function () {

    "use strict";


    angular
        .module('portfolioApp').component('about', {
        templateUrl: 'pages/about/about.tpl.html'
    })

        .controller('aboutController', ['$scope', '$location', function ($scope, $location) {
            $scope.aboutPageLeave = function (page) {
                // console.log('you clicked');
                $('.home').css('animation', 'slideInUp 1s ease-in');
                $location.path(page);
            };

            $scope.pageClass = 'about';

            // $('.about__bio').delay(800).fadeIn(400);

            // $scope.delayerr = function () {
            //     // $('.about__image').css('opacity','0').delay(800).css('opacity','1')
            //     // $(".about__image").delay("fast").fadeIn();
            //     $(".about__image").fadeTo(1000, 1);
            // }
            $(".about__image img").fadeTo(3000, 1);
            $(".about__bio").fadeTo(3000, 1);

        }]);

})();
