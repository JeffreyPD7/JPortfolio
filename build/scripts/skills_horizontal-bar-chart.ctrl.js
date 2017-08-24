(function () {

    "use strict";

    angular
        .module("portfolioApp")
        .config(['ChartJsProvider', function (ChartJsProvider) {
            // Configure all charts
            ChartJsProvider.setOptions('animation', {
                duration: 6000
            });

            // ChartJsProvider.setOptions('tooltips', {
            //     bodyFontSize: 16
            // });
        }])

        .controller("horizontalBarCtrl",
            function ($scope, $firebaseArray, firebaseFac) {

                // Firebase content
                const skillsRef = firebaseFac.child('skills_tbl'),
                    skillsObj = skillsRef.child('skills__horizontal-chart_tbl');

                
                $scope.dataHolder = $firebaseArray(skillsObj);

                skillsObj.on('value', function (snap) {
                    var dataP = [],
                        i = 0;


                    snap.forEach(function (data) {
                        dataP[i] = data.val();
                        i++;
                    });

                    // Data values for graph
                    $scope.data1 = [
                        [dataP[0], dataP[1], dataP[2], dataP[3], dataP[4], dataP[5],
                            dataP[6], dataP[7], dataP[8], dataP[9]]
                    ];
                });


                // Controlller Content
                $scope.labels1 = ['Bash Shell', 'Firebase', 'Git', 'Gulp', 'jQuery',
                    'Node.js', 'Photoshop', 'Pug', 'SCSS', 'Vagrant'];

                $scope.colors1 = [
                    {
                        backgroundColor: ["#F44336", "#2196F3", "#CDDC39", "#E91E63", "#FFEB3B", "#3F51B5", "#607D8B", "#9E9E9E", "#FF9800", "#795548", "#03A9F4"],
                        borderColor: "transparent"
                    }
                ];

                $scope.options1 = ('default', {
                    // title: {
                    //     display: true,
                    //     text: 'Dev Tools & Design',
                    //     padding: 10,
                    //     fontSize: 30,
                    //     fontFamily: 'Orbitron'
                    // },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                min: 0,
                                max: 100,
                                beginAtZero: true
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    tooltips: {
                        bodyFontSize: 16
                    }

                });
            });

})();
