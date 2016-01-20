app.factory('productListing',['$http',function($http){
	return $http.get('/js/services/expandedProducts.json')
	.success(function(data){
		return data;
	});
}]);