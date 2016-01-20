app.controller('StatusController', function($scope,$location,Authentication){

	$scope.logout=function(){

		Authentication.logout();
		console.log("here");
		$location.path('/login');
	};
});