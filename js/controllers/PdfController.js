app.controller('PdfController',function($scope,$routeParams,universityListing){
	universityListing.success(function(data){
		$scope.university=data[$routeParams.id];
	})
});