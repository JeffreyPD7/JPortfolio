(function () {

    "use strict";

    angular
        .module('portfolioApp').component('contact', {
        templateUrl: 'pages/contact.tpl.html'
    })

        .controller('contactController',
            function ($scope, $location, $firebaseArray, firebaseFac, $mdToast) {

                // Firebase content
                const contactRef = firebaseFac.child('contactMessaging');
                $scope.contactData = $firebaseArray(contactRef);

                $scope.contactMessage = null;

                $scope.saveContactData = function (data) {
                    if (data) {
                        $scope.contactData.$add(data);
                        $scope.showToast('Thanks! Your message has been sent');
                        $scope.contactMessage = {};
                        $scope.contactMessageForm.$setPristine();
                        $scope.contactMessageForm.$setUntouched();
                        // $scope.reset($scope.contactMessage);
                    }
                };

                $scope.showToast = function showToast(message) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content(message)
                            .position('top, right')
                            .hideDelay(5000)
                    )
                };

                $scope.reset = function(form) {
                    // Each control (input, select, textarea, etc) gets added as a property of the form.
                    // The form has other built-in properties as well. However it's easy to filter those out,
                    // because the Angular team has chosen to prefix each one with a dollar sign.
                    // So, we just avoid those properties that begin with a dollar sign.
                    let controlNames = Object.keys(form).filter(key => key.indexOf('$') !== 0);

                    // Set each control back to undefined. This is the only way to clear validation messages.
                    // Calling `form.$setPristine()` won't do it (even though you wish it would).
                    for (let name of controlNames) {
                        let control = form[name];
                        control.$setViewValue(undefined);
                    }

                    form.$setPristine();
                    form.$setUntouched();
                };

                // Controller Content
                $scope.contactPageLeave = function (page) {
                    // console.log('you clicked');
                    $('.home').css('animation', 'slideInDown 1s ease-in');
                    $location.path(page);
                };

                $scope.pageClass = 'contact';

            });

})();