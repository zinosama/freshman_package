app.factory('Authentication', function($firebase,$firebaseAuth,$routeParams,$firebaseArray,$firebaseObject,$location,$rootScope,FIREBASE_URL){
	 var ref=new Firebase('https://freshmanpackage.firebaseio.com/');
	var auth=$firebaseAuth(ref);
	
	auth.$onAuth(function(authUser){
	if(authUser){
		var ref=new Firebase('https://freshmanpackage.firebaseio.com/users/'+authUser.uid);
		$rootScope.currentUser=$firebaseObject(ref);
	}else{
		$rootScope.currentUser='';
	}
	});

	var myObject={
		login:function(user){
			return auth.$authWithPassword({
				email:user.email,
				password:user.password
			});//authWithPassword
		},//login

		logout:function(user){
			// $rootScope.currentUser='';
			return auth.$unauth();
		},//logout
		
		register:function(user){
			return auth.$createUser({
				email:user.email,
			 	password:user.password
			});
		},//register

		requireAuth:function(){
			return auth.$requireAuth();
		},//require Authentication

		waitForAuth:function(){
			return auth.$waitForAuth();
		}//wait until user is authenticated
	};

	return myObject;
});