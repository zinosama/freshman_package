var app=angular.module("myApp",['ngRoute','firebase']).constant('FIREBASE_URL','https://freshmanpackage.firebaseio.com/');

app.run(['$rootScope','$location',function($rootScope,$location){
	$rootScope.$on('$routeChangeError',function(event,next,previous,error){
			if(error==='AUTH_REQUIRED'){
				$rootScope.message='Sorry, you must log in to access this page.';
				$location.path('/login');
			}
	});
}]);

app.config(function($routeProvider){ 
	$routeProvider
	.when('/',{
		controller:'MainController',
		templateUrl:'views/main.html'
	})
	.when('/photos/:id&:id2',{
		controller:'PhotoController',
		templateUrl:'views/photo.html'
	})
	.when('/aiyoubucuozhandui',{
		controller:'AiyoController',
		templateUrl:'views/aiyou.html'
	})
	.when('/checklist',{
		controller:'ChecklistController',
		templateUrl:'views/checklist.html'
	})
	.when('/pdf/:id',{
		controller:'PdfController',
		templateUrl:'views/pdf.html'
	})		
	.when('/login',{
		controller:'RegistrationController',
		templateUrl:'views/login.html'
	})
	.when('/register',{
		controller:'RegistrationController',
		templateUrl:'views/register.html'
	})
	.when('/contact',{
		controller:'ContactController',
		templateUrl:'views/contact.html'
	})
	.when('/success/:idd',{
		controller:'SuccessController',
		templateUrl:'views/success.html'
	})
	// .when('/checkout',{
	// 	controller:'CheckOutController',
	// 	templateUrl:'views/checkout.html',
	// 	resolve:{
	// 		currentAuth:function(Authentication){
	// 			return Authentication.requireAuth();
	// 		}
	// 	}
	// })
	.when('/myCart',{
		controller:'ShoppingCartController',
		templateUrl:'views/myCart.html',
		resolve:{
			currentAuth:function(Authentication){
				return Authentication.requireAuth();
			}
		}
	})
	.when('/myAccount',{
		controller:'MyAccountController',
		templateUrl:'views/myAccount.html',
		resolve:{
			currentAuth:function(Authentication){
				return Authentication.requireAuth();
			}
		}
	})
	.otherwise({
		redirectTo:'/'
	});
});
 

















 
























































































































