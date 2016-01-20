app.controller('RegistrationController',function($scope,$firebaseAuth,$location){
	var ref=new Firebase('https://freshmanpackage.firebaseio.com/');
	var auth=$firebaseAuth(ref);

	$scope.login=function(){
		auth.$authWithPassword({
			email:$scope.user.email,
			password:$scope.user.password
		}).then(function(user){
			$location.path('/');
		}).catch(function(error){
			$scope.message=error.message;
		});
	};//login

	$scope.register=function(){
		$location.path('/');
	}//register
});