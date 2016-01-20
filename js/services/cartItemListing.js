app.factory('CartItemListing',function($firebase,$rootScope){
	return function(){
		var length;
		var userRegId=$rootScope.currentUser.$id;
		var userRef=new Firebase("https://freshmanpackage.firebaseio.com/users/"+userRegId+"/shoppingCart/");
		userRef.once("value",function(snap){
			console.log(length=Object.keys(snap.val()).length);
		},function(errorObject){
			console.log(length="the read failed: "+errorObject.code);
		});
		return length;
	}
});