(function () {

    "use strict";

    angular
        .module('portfolioApp').component('home', {
        templateUrl: 'pages/home/home.tpl.html'})

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

            // var fukUrl = FirebaseUrl;
            // var ref = new Firebase(fukUrl);
            // var shitRef = $firebaseArray(ref);

            // var rootRef = firebase.database().ref().child('portfoliosite-5e085');
            // var refRef = rootRef..child('simehitng');
            // this.ref = $firebaseArray(refRef);
            // ref.$bindTo($scope, "data");


            // rootRef.on('value', function() {
            //     console.log('connected');
            // });


            // firebaseRef.rootRef.on('value', function () {
            //     console.log('connected');
            // });

        }]);

})();

