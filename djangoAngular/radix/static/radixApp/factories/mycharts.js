"use strict";
angular.module('radixPiApp')
    .factory("mychartsFactory", ["$q", "$route", "$http", "Notification",
        function ($q, $route, $http, notification) {

            return {
                pieChart: function (address, jsonParameters, plottooltext, exportFileName) {
                    var deferredObject = $q.defer();
                    $http.post(address, jsonParameters)
                        .success(function (response) {
                            if (response.success === true) {
                                var chart = {
                                    startingangle: "120",
                                    showlabels: "0",
                                    showlegend: "1",
                                    enablemultislicing: "0",
                                    slicingdistance: "15",
                                    showpercentvalues: "0",
                                    showpercentintooltip: "1",
                                    plottooltext: plottooltext,
                                    toolTipColor: "#ffffff",
                                    toolTipBorderThickness: "0",
                                    toolTipBgColor: "#000000",
                                    toolTipBgAlpha: "80",
                                    toolTipBorderRadius: "2",
                                    toolTipPadding: "5",
                                    theme: "fint",
                                    exportEnabled: "1",
                                    exportAtClientSide: "1",   // ahora mismo solamente funciona en Chrome y Firefox
                                    exportFormats: "PNG=Guardar como PNG|JPG=Guardar como JPG|SVG=Guardar como SVG|PDF=Guardar como PDF",
                                    exportTargetWindow: "_self",
                                    exportFileName: exportFileName
                                    //"exportAction": "download" // para exportar del servidor. Hay que hacer unas cuantas modificaciones en el hosting (IIS).
                                }

                                deferredObject.resolve({ success: true, chart: chart, data: response.data });
                            } else {
                                notification.error({
                                    message: "Error al recuperar " + exportFileName,
                                    delay: 5000
                                });
                                deferredObject.resolve({ success: false });
                            }
                        })
                        .error(function () {
                            notification.error({
                                message: "Error al recuperar " + exportFileName + " al intentar conectar con el servidor.",
                                delay: 5000
                            });
                            deferredObject.resolve({ success: false });
                        });
                    return deferredObject.promise;
                },
                areaChart: function (address, jsonParameters, xAxisName, yAxisName, plottooltext, exportFileName) {
                    var deferredObject = $q.defer();
                    $http.post(address, jsonParameters)
                        .success(function (response) {
                            if (response.success === true) {
                                var chart = {
                                    "xAxisName": xAxisName,
                                    "yAxisName": yAxisName,
                                    plottooltext: plottooltext,
                                    "paletteColors": "#0075c2",
                                    theme: "ocean",
                                    "bgColor": "#ffffff",
                                    "showBorder": "0",
                                    "showCanvasBorder": "0",
                                    "plotBorderAlpha": "10",
                                    "usePlotGradientColor": "0",
                                    "plotFillAlpha": "50",
                                    "showXAxisLine": "1",
                                    "axisLineAlpha": "25",
                                    "divLineAlpha": "10",
                                    "showValues": "1",
                                    "showAlternateHGridColor": "0",
                                    "captionFontSize": "14",
                                    "subcaptionFontSize": "14",
                                    "subcaptionFontBold": "0",
                                    "toolTipColor": "#ffffff",
                                    "toolTipBorderThickness": "0",
                                    "toolTipBgColor": "#000000",
                                    "toolTipBgAlpha": "80",
                                    "toolTipBorderRadius": "2",
                                    "toolTipPadding": "5",
                                    "exportEnabled": "1",
                                    "exportAtClientSide": "1",   // ahora mismo solamente funciona en Chrome y Firefox
                                    "exportFormats": "PNG=Guardar como PNG|JPG=Guardar como JPG|SVG=Guardar como SVG|PDF=Guardar como PDF",
                                    "exportTargetWindow": "_self",
                                    "exportFileName": exportFileName
                                    //"exportAction": "download" // para exportar del servidor. Hay que hacer unas cuantas modificaciones en el hosting (IIS).
                                }

                                deferredObject.resolve({ success: true, chart: chart, data: response.results });
                            } else {
                                notification.error({
                                    message: "Error al recuperar " + exportFileName,
                                    delay: 5000
                                });
                                deferredObject.resolve({ success: false });
                            }
                        })
                        .error(function () {
                            notification.error({
                                message: "Error al recuperar " + exportFileName + " al intentar conectar con el servidor.",
                                delay: 5000
                            });
                            deferredObject.resolve({ success: false });
                        });
                    return deferredObject.promise;
                },
                areaLiveChart: function (address, xAxisName, yAxisName, yaxisminvalue, yaxismaxvalue, exportFileName, numdisplaysets) {
                    var deferredObject = $q.defer();
                    $http.post(address)
                        .success(function (response) {
                            if (response.success === true) {
                                var chart = {
                                    "manageresize": "1",    // averiguar bien para que sirve                                    
                                    "numdisplaysets": numdisplaysets, // cantidad de valores a mostrar                                    
                                    "showrealtimevalue": "0",   // muestra el ultimo valor abajo de la grafica 
                                    //"rotatelabels": "1",  // gira 90 grados el label del eje x
                                    //"slantlabels": "1",   // inclina el label del eje x (hay que usarlo con rotatelabels)
                                    //"xAxisName": xAxisName,
                                    "yaxisname": yAxisName,
                                    "yaxisminvalue": yaxisminvalue,
                                    "yaxismaxvalue": yaxismaxvalue,
                                    // Anchor: Circulo de cada valor                                    
                                    "anchorradius": "3",
                                    "anchorbgcolor": "0377D0",
                                    "anchorbordercolor": "FFFFFF",
                                    "anchorborderthickness": "0",
                                    "anchoralpha": "90",
                                    // borde de la grafica
                                    "showplotborder": "1",
                                    "plotborderthickness": "2",
                                    "plotBorderAlpha": "25",
                                    "plotbordercolor": "0007D0",
                                    "plotfillcolor": "0377D0",                                    
                                    // "numvdivlines": "2", // poner ejes verticales en la grafica                                     
                                    // "canvaspadding": "0",    // supongo que para darle padding a la grafica. Revisar.
                                    "bgColor": "#ffffff",
                                    "showBorder": "0",
                                    "showCanvasBorder": "0",                                    
                                    "usePlotGradientColor": "0",
                                    "plotFillAlpha": "50",
                                    "showXAxisLine": "1",
                                    "axisLineAlpha": "25",
                                    "divLineAlpha": "10",
                                    "showValues": "1",
                                    "showAlternateHGridColor": "0",
                                    "captionFontSize": "14",
                                    "subcaptionFontSize": "14",
                                    "subcaptionFontBold": "0",
                                    "toolTipColor": "#ffffff",
                                    "toolTipBorderThickness": "0",
                                    "toolTipBgColor": "#000000",
                                    "toolTipBgAlpha": "80",
                                    "toolTipBorderRadius": "2",
                                    "toolTipPadding": "5",
                                    //------------------------
                                    "refreshinterval": "1",
                                    "exportEnabled": "1",
                                    "exportAtClientSide": "1",   // ahora mismo solamente funciona en Chrome y Firefox
                                    "exportFormats": "PNG=Guardar como PNG|JPG=Guardar como JPG|SVG=Guardar como SVG|PDF=Guardar como PDF",
                                    "exportTargetWindow": "_self",
                                    "exportFileName": exportFileName
                                }
                                deferredObject.resolve({ success: true, chart: chart, data: response.results });
                            } else {
                                notification.error({
                                    message: "Error al recuperar " + exportFileName,
                                    delay: 5000
                                });
                                deferredObject.resolve({ success: false });
                            }
                        })
                        .error(function () {
                            notification.error({
                                message: "Error al recuperar " + exportFileName + " al intentar conectar con el servidor.",
                                delay: 5000
                            });
                            deferredObject.resolve({ success: false });
                        });
                    return deferredObject.promise;
                }
            }
        }])
;