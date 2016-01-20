app.controller('PhotoController',function($scope,productListing,$routeParams,$firebase,$firebaseAuth,$firebaseObject,$location){
	productListing.success(function(data){
		// console.log("first param: "+$routeParams.id+" second param: "+$routeParams.id2);
		$scope.detail=data[$routeParams.id].products[$routeParams.id2];
	});

    // jQuery(function($){


    	$('.myTabs a[href="#productDescription"]').click(function(e){
    		e.preventDefault();
    		$(this).tab('show');
    	});
    	$('.myTabs a[href="#ourOpinion"]').click(function(e){
    		e.preventDefault();
    		$(this).tab('show');
    	});
    	$('.myTabs a[href="#school"]').click(function(e){
    		e.preventDefault();
    		$(this).tab('show');
    	});
	// })

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

	$(document).ready(function() {
		$(".fancybox").fancybox({
			openEffect	: 'none',
			closeEffect	: 'none'
		});
		$('#cartButton').click(function(e){
			$('#successModel').modal('toggle');
			$('#successModel').on('hidden.bs.modal',function(e){
				window.location.href='#/myCart';
			});
    	});
    	$('#continueButton').click(function(e){
			$('#successModel').modal('toggle');
			$('#successModel').on('hidden.bs.modal',function(e){
				window.location.href='#/';
			});
    	});
	});
	$scope.addToCart=function(){
		if(userRegId==null){
			// console.log("check");
			$('#successModel').modal('toggle');
			$('#successModel').on('hidden.bs.modal',function(e){
				window.location.href='#/login';
			});
		}else{
			var userRef=new Firebase("https://freshmanpackage.firebaseio.com/users/"+userRegId+"/shoppingCart/");
			var obj=$firebaseObject(userRef);
			obj.$loaded().then(function(){
				var objKey="product"+$routeParams.id+"_"+$routeParams.id2;
				
				if(obj[objKey]!=null){
					obj[objKey].quantity++;
					obj.$save().then(function(ref){
						console.log("quantity updated");
					});
				}else{
					obj[objKey]={
						indexOne:$routeParams.id,
						indexTwo:$routeParams.id2,
						key:objKey,
						quantity:1
					};
					obj.$save().then(function(ref){
					});
				}
			});
		}//else
	};//addToCart
});