app.controller('MainController',['$scope','productListing',function($scope,productListing){
		productListing.success(function(data){
			$scope.categories=data;
		});
}]);