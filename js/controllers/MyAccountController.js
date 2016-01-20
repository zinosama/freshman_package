app.controller('MyAccountController',function($scope,$firebase,$firebaseAuth,$firebaseObject,productListing){
		
	productListing.success(function(data){
		$scope.productTypes=data;
		var ref=new Firebase('https://freshmanpackage.firebaseio.com/');
		var auth=$firebaseAuth(ref);
		var userRegId;

		auth.$onAuth(function(authUser){
			if(authUser){
				userRegId=authUser.uid;
				console.log(userRegId);
				var orderRef=new Firebase('https://freshmanpackage.firebaseio.com/users/'+userRegId+'/history');
				$scope.allOrders=$firebaseObject(orderRef);
				// orderObj.$loaded().then(function(){
				// 	$scope.allOrders=orderObj;
				// })
				// console.log($scope.allOrders);
			}else{
				userRegId='';
			}
	 	});
	});	
});