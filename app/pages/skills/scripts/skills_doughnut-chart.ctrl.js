(function () {

    "use strict";

    angular
        .module("portfolioApp")
        .controller("doughnutChartCtrl",
            function ($scope, $firebaseArray, firebaseFac) {

                // Firebase content
                const skillsRef = firebaseFac.child('skills_tbl'),
                    skillsObj = skillsRef.child('skills__doughnut-chart_tbl');

                $scope.dataHolder = $firebaseArray(skillsObj);

                skillsObj.on('value', function (snap) {
                    var dataP = [],
                        i = 0;

                    snap.forEach(function (data) {
                        dataP[i] = data.val();
                        i++;
                    });

                    // Data values for graph
                    $scope.data2 = [
                        [dataP[0], dataP[1], dataP[2]]
                    ];
                });

                // Controller Content
                $scope.labels2 = ["Bootstrap","AngularFire","Laravel"];
                // $scope.data2 = [90, 70, 30];
                $scope.colors2 = ['#F44336', '#3F51B5', '#607D8B'];

                $scope.options2 = ('default', {
                    // title: {
                    //     display: true,
                    //     text: 'Frameworks',
                    //     fontSize: 30,
                    //     fontFamily: 'Orbitron',
                    //     padding: 10
                    // },
                    legend: {
                        position: 'top',
                        display: true
                    }
                });
            });

})();
