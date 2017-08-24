(function () {

    "use strict";

    angular
        .module("portfolioApp")
        .controller("radarChartCtrl",
            function ($scope, $firebaseArray, firebaseFac) {

                // Firebase content
                const skillsRef = firebaseFac.child('skills_tbl'),
                    skillsObj = skillsRef.child('skills__radar-chart_tbl');

                $scope.dataHolder = $firebaseArray(skillsObj);

                skillsObj.on('value', function (snap) {
                    var dataP = [],
                        i = 0;

                    snap.forEach(function (data) {
                        dataP[i] = data.val();
                        i++;
                    });

                    // Data values for graph
                    $scope.data3 = [
                        [dataP[0], dataP[1], dataP[2], dataP[3], dataP[4],
                            dataP[5], dataP[6], dataP[7], dataP[8], dataP[9]]
                    ];
                });


                // Controller Content
                $scope.labels3 = ["PHP", "HTML", "CSS", "Javascript", "Java", "OOP", "C", "C++", "C#", "SQL"];

                // $scope.data3 = [65, 95, 95, 65, 50, 70, 60, 65, 65, 70, 80];

                $scope.options3 = ('default', {
                    // title: {
                    //     display: true,
                    //     text: 'Languages',
                    //     fontSize: 30,
                    //     padding: 10,
                    //     fontFamily: 'Orbitron'
                    // },
                    yAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                });
            });

})();
