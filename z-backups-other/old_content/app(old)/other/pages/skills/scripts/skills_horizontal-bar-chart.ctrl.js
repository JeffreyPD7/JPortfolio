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

                // IDK how this works but it sets up the data query for graph
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
                            dataP[6], dataP[7], dataP[8], dataP[9], dataP[10], dataP[11]]
                    ];
                });


                // Controlller Content
                $scope.labels1 = ['Gulp', 'SCSS', 'Grunt', 'Node.js', 'Bash Shell',
                    'jQuery', 'Git', 'Chrome Dev', 'Photoshop', 'Avocode',
                    'Chart.js', 'WebStorm', 'Vagrant'];

                $scope.colors1 = [
                    {
                        backgroundColor: ["#F44336", "#2196F3", "#CDDC39", "#E91E63", "#FFEB3B", "#3F51B5", "#607D8B", "#9E9E9E", "#FF9800", "#795548", "#03A9F4"],
                        // pointBackgroundColor: "rgba(159,204,0, 1)",
                        // pointHoverBackgroundColor: "rgba(159,204,0, 0.8)",
                        borderColor: "transparent"
                        // pointBorderColor: '#fff',
                        // pointHoverBorderColor: "rgba(159,204,0, 1)"
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


// Working Version of data for radar query
// $scope.work = $firebaseArray(skillsObj);
//
// var dataT = 0;
// var dataP = [];
//
// skillsObj.on('value', function (snap) {
//     var i = 0;
//
//     snap.forEach(function (data) {
//         dataT = parseInt(data.val());
//         dataP[i] = dataT;
//         i++;
//     });
//
//     // return dataP;
//     $scope.data1 = [
//         [dataP[0], dataP[1], dataP[2], dataP[3], dataP[4], dataP[5],
//             dataP[6], dataP[7], dataP[8], dataP[9], dataP[10], dataP[11]]
//     ];
// });

























// skillsObjQueried.on('value', function (snap) {
//     console.log(snap.val());
// })


// const ref = firebaseFac.child('simehitng');
// this.ranks = $firebaseArray(ref);
// console.log(this.ranks);

// $scope.$on('chart-create', function (evt, chart) {
//     console.log(chart);
// });

// const skillsObjectRef = skillsRef.child()
// this.ranks = $firebaseArray(ref);

// skillsRef.on('value', function (snap) {
//     console.log(snap.val());
// });
