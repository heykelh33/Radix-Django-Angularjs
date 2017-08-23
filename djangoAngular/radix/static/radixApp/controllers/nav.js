"use strict";

angular.module("radixPiApp")

.controller("NavCtrl", ["$scope", 
	function ($scope) {
		$scope.elems = [
			{
				index: 0,
				name: "Tiempo Real",
				icon: "chart-line",
				animation: "spanner"
			},
			{
				index: 1,
				name: "Historial",
				icon: "history",
				animation: "horizontal"
			}
		];
		
		$scope.indexActive = 0;
		
		$scope.setIndex = function(index)
		{
			$scope.indexActive = index;
		}
	}])

;