app.controller('MainController',function($scope,productListing,$firebase,$firebaseObject,$rootScope,$firebaseAuth,$firebaseArray){
		// console.log(CartItemListing());
		var ref=new Firebase('https://freshmanpackage.firebaseio.com/');
		var auth=$firebaseAuth(ref);
		var userRegId;


		auth.$onAuth(function(authUser){
		if(authUser){
			userRegId=authUser.uid;
		}else{
			userRegId=null;
		}
		});

		productListing.success(function(data){
			// console.log(data);
			$scope.categories=data;
		});
		// console.log(itemArray.length);	

		$(document).ready(function() {
				$('#cartButtonMain').click(function(e){
					$('#main-model').modal('toggle');
					$('#main-model').on('hidden.bs.modal',function(e){
						window.location.href='#/myCart';
					});
		    	});
		    	$('#continueButton').click(function(e){
					$('#main-model').modal('toggle');
					$('#main-model').on('hidden.bs.modal',function(e){
						window.location.href='#/';
					});
		    	});
		});
		$scope.addToCart=function(firstIndex,secondIndex){
			if(userRegId==null){
				// console.log("check");
				$('#main-model').modal('toggle');
				$('#main-model').on('hidden.bs.modal',function(e){
					window.location.href='#/login';
				});
			}else{
				console.log(userRegId);
				var userRef=new Firebase("https://freshmanpackage.firebaseio.com/users/"+userRegId+"/shoppingCart/");
				var obj=$firebaseObject(userRef);
				obj.$loaded().then(function(){
					var objKey="product"+firstIndex+"_"+secondIndex;
					
					if(obj[objKey]!=null){
						obj[objKey].quantity++;
						obj.$save().then(function(ref){
							console.log("quantity updated");
						});
					}else{
						obj[objKey]={
							indexOne:firstIndex,
							indexTwo:secondIndex,
							key:objKey,
							quantity:1
						};
						obj.$save().then(function(ref){
							// console.log("shopping: "+ref.key());
						});
					}
				});
			}//else
		};
		$scope.categoryQuery=function(input){
			// console.log(input);
			$rootScope.primQuery=input;
		}
});