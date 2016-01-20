app.controller('NavController', function($scope,$firebase,$firebaseArray,$firebaseAuth){
	$(document).ready(function() {
		var path=window.location.href;
		if(path=="http://freshmanpackage.com/home.html#/contact"){
			$('li#contact').addClass('active');
		}else if(path=="http://freshmanpackage.com/home.html#/myAccount"){
			$('li#myAccount').addClass('active');
		}else if(path=="http://freshmanpackage.com/home.html#/"){
			$('li#home').addClass('active');
		}else if(path=="http://freshmanpackage.com/home.html#/myCart"){
			$('li#cart').addClass('active');
		}else if(path=="http://freshmanpackage.com/home.html#/login"){
			$('li#login').addClass('active');
		}else if(path=="http://freshmanpackage.com/home.html#/register"){
			$('li#register').addClass('active');
		}else if(path=="http://freshmanpackage.com/home.html#/checklist"){
			$('li#checklist').addClass('active');
		}
	});
	$scope.checkURL=function(input){
		var cL="http://freshmanpackage.com/home.html"+input;
		if(cL=="http://freshmanpackage.com/home.html#/contact"){
			$('li.active').removeClass('active');
			$('li#contact').addClass('active');
		}else if(cL=="http://freshmanpackage.com/home.html#/myAccount"){
			$('li.active').removeClass('active');
			$('li#myAccount').addClass('active');
		}else if(cL=="http://freshmanpackage.com/home.html#/"){
			$('li.active').removeClass('active');
			$('li#home').addClass('active');
		}else if(cL=="http://freshmanpackage.com/home.html#/myCart"){
			$('li.active').removeClass('active');
			$('li#cart').addClass('active');
		}else if(cL=="http://freshmanpackage.com/home.html#/login"){
			$('li.active').removeClass('active');
			$('li#login').addClass('active');
		}else if(cL=="http://freshmanpackage.com/home.html#/register"){
			$('li.active').removeClass('active');
			$('li#register').addClass('active');
		}else if(cL=="http://freshmanpackage.com/home.html#/checklist"){
			$('li.active').removeClass('active');
			$('li#checklist').addClass('active');
		}
	};


	var ref=new Firebase('https://freshmanpackage.firebaseio.com/');
	var auth=$firebaseAuth(ref);

	auth.$onAuth(function(authUser){
		if(authUser){
			userRegId=authUser.uid;
			var userRef=new Firebase("https://freshmanpackage.firebaseio.com/users/"+userRegId+"/shoppingCart/");
			var itemArray=$firebaseArray(userRef);
			itemArray.$loaded().then(function(){
				// $scope.howManyItems=itemArray.length;
				$scope.howManyItems=0;
				for(var i=0;i<itemArray.length;i++){
					$scope.howManyItems=$scope.howManyItems+itemArray[i].quantity;
				}
			});
		itemArray.$watch(function(data){
			// $scope.howManyItems=itemArray.length;
			$scope.howManyItems=0;
			for(var i=0;i<itemArray.length;i++){
				$scope.howManyItems=$scope.howManyItems+itemArray[i].quantity;
			}
		});
		}else{
			$scope.howManyItems='';
		}
	});


});