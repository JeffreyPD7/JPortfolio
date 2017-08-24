(function () {

    "use strict";

    angular
        .module('portfolioApp').component('projects', {
        templateUrl: 'pages/projects.tpl.html'
    })

        .controller('projectsController',
            function ($scope, $location) {
                $scope.projectsPageLeave = function (page) {
                    // console.log('you clicked');
                    $('.home').css('animation', 'slideInLeft 1s ease-in');
                    $location.path(page);
                };

                $scope.pageClass = 'projects';

                setTimeout(function () {
                    $(".projects_-_slides--card:nth-child(1)").hover(function () {
                        $(this).stop();
                    });

                }, 6000);

                $(".projects_-_slides--card:nth-child(1)").fadeTo(1000, 1);
                $(".projects_-_slides--card:nth-child(2)").delay(1000).fadeTo(1000, 1);
                $(".projects_-_slides--card:nth-child(3)").delay(2000).fadeTo(1000, 1);
            });
})();
