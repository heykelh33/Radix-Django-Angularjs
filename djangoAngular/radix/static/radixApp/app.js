angular.module("radixPiApp", ['ngRoute', "ui-notification", "ng-fusioncharts", "bw.paging"])

    .config(["$routeProvider", "$interpolateProvider", "$httpProvider",
        function ($routeProvider, $interpolateProvider, $httpProvider) {

            console.log("radixPiApp config");

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

            // La desventaja de emplear esta simbologia es a la hora de incorporar plugins de terceros.
            // Por eso pudiera ser mejor emplear la etiqueta <verbose>.
            //$interpolateProvider.startSymbol('{$');
            //$interpolateProvider.endSymbol('$}');

            // utilizando ruteo de django
            //$routeProvider
            //.when('/', {templateUrl: 'index.html', controller: 'HomeCtrl'})
            //.otherwise({redirectTo: '/radix/'});

            // Obligado para hacer un request al servidor y no de 403 (Forbidden)
            $httpProvider.defaults.xsrfCookieName = 'csrftoken';
            $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
            // ******************************************************************
        }])

//.constant('settings', {
//    STATIC_URL: '/static/'
//})

//.config(['$sceDelegateProvider',
//    function($sceDelegateProvider) {
//        // Set a new whitelist
//        $sceDelegateProvider.resourceUrlWhitelist(['self']);
//}])

    .run([function () {
        console.log("MyApp running");
    }])

    .directive("minimizeDirective", ['$document', function ($document) {
        return {
            link: function ($scope, elem, attrs) {

                $scope.minimize = function (element) {
                    element.state = !element.state;
                }

                $scope.panels = [
                    {
                        index: 0,
                        name: "Temperatura",
                        icon: "thermometer2",
                        state: true,
                        datasource: $scope.datasource1,
                        events: "events1",
                        lastvalue: 0,
                        history: [],
                        pageTotal: 0,
                        pageSize: 10,
                        currentPage: 1
                    },
                    {
                        index: 1,
                        name: "Humedad",
                        icon: "water",
                        state: true,
                        datasource: $scope.datasource2,
                        events: "events2",
                        lastvalue: 0,
                        history: [],
                        pageTotal: 0,
                        pageSize: 10,
                        currentPage: 1
                    }
                ];
            }
        }
    }])
    
;