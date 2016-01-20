app.factory('universityListing',['$http',function($http){
	return $http.get('/js/services/universities.json')
	.success(function(data){
		return data;
	});
}]);