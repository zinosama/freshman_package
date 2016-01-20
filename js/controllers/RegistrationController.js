app.controller('RegistrationController',function($scope,$firebaseAuth,$location,$firebaseArray,$firebaseObject,$rootScope,FIREBASE_URL,Authentication){
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
	// var testRef=new Firebase("https://freshmanpackage.firebaseio.com/users/");
	// var list=$firebaseArray(testRef);
	// var rec=list.$loaded().then(function(){list.$getRecord("Jr_8NtrGOPqjAZvjr_n")});
	// console.log(rec);

	$scope.login=function(){
		Authentication.login($scope.user)
		.then(function(user){
			$location.path('/');
			// auth.$onAuth(function(authUser){
			// 	if(authUser){
			// 		var ref=new Firebase('https://freshmanpackage.firebaseio.com/users/'+authUser.uid);
			// 		$rootScope.currentUser=$firebaseObject(ref);
			// 	}else{
			// 		$rootScope.currentUser='';
			// 	}
			// });
		}).catch(function(error){
			$scope.message=error.message;
		});
	};//login

	$scope.register=function(){
		Authentication.register($scope.user)
		.then(function (regUser) {
			var userRef=new Firebase("https://freshmanpackage.firebaseio.com/users/");
			var obj=$firebaseObject(userRef);
			obj.$loaded().then(function(){
				var regKey=regUser.uid;
				obj[regKey]={
			 		date:Firebase.ServerValue.TIMESTAMP,
			 		key:regKey,
			 		firstname:$scope.user.firstname,
			 		lastname:$scope.user.lastname,
			 		email:$scope.user.email,
			 		wechat:$scope.user.wechat,
			 		university:$scope.user.university 
				}
				obj.$save().then(function(ref){
					console.log(ref.key());
				}); 
			});
			// $scope.users=$firebaseArray(userRef);
			// $scope.users.$add({
	 	// 	date:Firebase.ServerValue.TIMESTAMP,
	 	// 	// regUser:regUser.uid,
	 	// 	firstname:$scope.user.firstname,
	 	// 	lastname:$scope.user.lastname,
	 	// 	email:$scope.user.email
			// });
			Authentication.login($scope.user);
			$location.path('/');
		}).catch(function(error){
			$scope.message=error.message;
		});
	};//register
});