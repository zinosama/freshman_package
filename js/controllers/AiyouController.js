app.controller('AiyoController',function($scope,$firebase,$firebaseAuth,$firebaseObject,productListing){
		
	productListing.success(function(data){
		$scope.productTypes=data;
		var ref=new Firebase('https://freshmanpackage.firebaseio.com/');
		var auth=$firebaseAuth(ref);
		var userRegId;

		auth.$onAuth(function(authUser){
			if(authUser){
				userRegId=authUser.uid;
				console.log(userRegId);
				var orderRef=new Firebase('https://freshmanpackage.firebaseio.com/orders/');
				$scope.allOrders=$firebaseObject(orderRef);
			}else{
				userRegId='';
			}
	 	});
	});	
});