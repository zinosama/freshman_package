app.controller('PhotoController',['$scope','productListing','$routeParams',function($scope,productListing,$routeParams){
	productListing.success(function(data){
		// console.log("first param: "+$routeParams.id+" second param: "+$routeParams.id2);
		$scope.detail=data[$routeParams.id].products[$routeParams.id2];
	});
}]);