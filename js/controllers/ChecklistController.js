app.controller('ChecklistController',function($scope,universityListing){
	universityListing.success(function(data){
		$scope.universities=data;
	});

});