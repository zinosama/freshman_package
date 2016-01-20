app.controller('ShoppingCartController',function($scope,$firebase,$firebaseObject,$rootScope,$firebaseArray,productListing){
	
	
	productListing.success(function(data){
		$scope.categories=data;
	

		var userRegId=$rootScope.currentUser.$id;
		var ref=new Firebase("https://freshmanpackage.firebaseio.com/users/"+userRegId+"/shoppingCart/");
		$scope.allIndex=$firebaseObject(ref);
		// console.log($scope.allIndex);


		var itemArray=$firebaseArray(ref);
		itemArray.$loaded().then(function(){
			$scope.total=0;
			for(var i=0;i<itemArray.length;i++){
				var indexOne=itemArray[i].indexOne;
				var indexTwo=itemArray[i].indexTwo;
				var itemPrice=$scope.categories[indexOne].products[indexTwo].price;
				$scope.total=$scope.total+itemArray[i].quantity*itemPrice;
			}
			$scope.totalAfterTax=$scope.total*1.08;
			itemArray.$watch(function(data){
				$scope.total=0;
				for(var i=0;i<itemArray.length;i++){
					var indexOne=itemArray[i].indexOne;
					var indexTwo=itemArray[i].indexTwo;
					var itemPrice=$scope.categories[indexOne].products[indexTwo].price;
					$scope.total=$scope.total+itemArray[i].quantity*itemPrice;
				}
				$scope.totalAfterTax=$scope.total*1.08;			
			});
		});
	});


	$scope.removeFromCart=function(key){
		var deleteRef=new Firebase("https://freshmanpackage.firebaseio.com/users/"+userRegId+"/shoppingCart/"+key);
		// console.log(userRegId);
		var deleteObj=$firebaseObject(deleteRef);
		deleteObj.$loaded().then(function(){	
			if(deleteObj.quantity<=1){
				deleteObj.$remove();
			}else{
				deleteObj.quantity--;
				deleteObj.$save().then(function(ref){
				});
			}
		});
	};//removeFromCart

	$scope.addToCart=function(key){
		var deleteRef=new Firebase("https://freshmanpackage.firebaseio.com/users/"+userRegId+"/shoppingCart/"+key);
	// console.log(userRegId);
		var deleteObj=$firebaseObject(deleteRef);
		deleteObj.$loaded().then(function(){	
			deleteObj.quantity++;
			deleteObj.$save().then(function(ref){
			});
		});
	};//addToCart
});