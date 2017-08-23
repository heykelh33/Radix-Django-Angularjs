"use strict";
angular.module("radixPiApp")

    .controller('HomeCtrl', ['$scope', "Notification", "$http", "mychartsFactory", "$timeout", "$q",
        function ($scope, Notification, $http, mychartsFactory, $timeout, $q) {

            var errorDelay = 5000;

            //console.log("HomeCtrl");

            function getAll(post) {
                var deferredObject = $q.defer();
                $http.post(post)
                    .success(function (response) {
                        if (response.success === true) {
                            deferredObject.resolve({ success: true, elements: response.results });
                        } else {
                            Notification.error({
                                message: 'Error al recuperar datos.', delay: errorDelay
                            });
                            deferredObject.resolve({ success: false });
                        }
                    })
                    .error(function () {
                        Notification.error({
                            message: 'Error en la conexión con el servidor.', delay: errorDelay
                        });
                        deferredObject.resolve({ success: false });
                    });
                    return deferredObject.promise;
            }

            var events = function (post, index) {
                return {
                    "rendered": function (evt, args) {
                        evt.sender.chartInterval = setInterval(function () {

                            var chartRef = evt.sender;
                            //console.log(chartRef);

                            $http.post(post)
                                .success(function (response) {
                                    if (response.success === true) {
                                        var last = response.results[0];
                                        var strData = "&label=" + last.label + "&value=" + last.value;
                                        chartRef.feedData(strData);

                                        $scope.panels[index].lastvalue = last.value;
                                        $scope.panels[index].history.push(last);
                                        $scope.panels[index].pageTotal += 1;
                                    }
                                });
                        }, 5000);
                    },
                    "disposed": function (evt, arg) {
                        clearInterval(evt.sender.chartInterval);
                    }
                }
            }

            $scope.datasource1 = {};
            mychartsFactory.areaLiveChart('/radix/last_data/1/1', "Tiempo",
                "Valor", "10", "40", "Gráfico de Temperatura", 12)
                .then(function (response) {
                    if (response.success) {
                        $scope.datasource1.chart = response.chart;

                        $scope.datasource1.categories = [{
                            "category": [{
                                "label": response.data.label
                            }]
                        }];

                        $scope.datasource1.dataset = [{
                            // "seriesname": "Temperatura",
                            // "showvalues": "0",
                            "data": [{
                                "value": response.data.value
                            }]
                        }];
                        
                    }
                });

            $scope.events1 = events('/radix/last_data/1/1', 0);
            
            getAll('/radix/last_data/1/20').then(function(response) {
                if (response.success) {
                    $scope.panels[0].history = response.elements;
                    $scope.panels[0].pageTotal = response.elements.length; 
                } 
            });

            $scope.datasource2 = {};
            mychartsFactory.areaLiveChart('/radix/last_data/2/1', "Tiempo",
                "Valor", "0", "100", "Gráfico de Humedad", 12)
                .then(function (response) {
                    if (response.success) {
                        $scope.datasource2.chart = response.chart;

                        $scope.datasource2.categories = [{
                            "category": [{
                                "label": response.data.label
                            }]
                        }];

                        $scope.datasource2.dataset = [{
                            // "seriesname": "Humedad",
                            // "showvalues": "0",
                            "data": [{
                                "value": response.data.value
                            }]
                        }]
                    }
                });

            $scope.events2 = events('/radix/last_data/2/1', 1);
            
            getAll('/radix/last_data/2/10').then(function(response) {
                if (response.success) {
                    $scope.panels[1].history = response.elements;
                    $scope.panels[1].pageTotal = response.elements.length;
                } 
            });
                    
            // var prom = 0, sum = 0, min = $scope.datasource1.data[0].value, max = 0;
            // for (var i = 0; i < $scope.datasource1.data.length; i++) {
            //     sum += $scope.datasource1.data[i].value;

            //     if (min > $scope.datasource1.data[i].value)
            //         min = $scope.datasource1.data[i].value;

            //     if (max < $scope.datasource1.data[i].value)
            //         max = $scope.datasource1.data[i].value;
            // }
            // prom = sum / $scope.datasource1.data.length;
            
            // $scope.datasource1.trendlines = [
            //     {
            //         "line": [
            //             {
            //                 "startvalue": prom,
            //                 "displayvalue": "Media - " + prom.toFixed(2),
            //                 "thickness": "1",
            //                 "color": "0372AB",
            //                 "dashed": "1",
            //                 "origText": "Media"
            //             },
            //             {
            //                 "startvalue": min,
            //                 "displayvalue": "Mínimo - " + min,
            //                 "thickness": "1",
            //                 "color": "DF8600",
            //                 "dashed": "1",
            //                 "origText": "Mínimo"
            //             },
            //             {
            //                 "startvalue": max,
            //                 "displayvalue": "Máximo - " + max,
            //                 "thickness": "1",
            //                 "color": "b55555",
            //                 "dashed": "1",
            //                 "origText": "Máximo"
            //             }
            //         ]
            //     }
            // ];


        }])

;