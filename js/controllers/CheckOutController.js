app.controller('CheckOutController', function($scope,productListing,$firebase,$rootScope,$firebaseObject,$firebaseArray,$firebaseAuth,$http){
	//----------------Firebase connection code -----
	//Retrieving product information
	productListing.success(function(data){
		$scope.categories=data;
		var authRef=new Firebase('https://freshmanpackage.firebaseio.com/');
		var auth=$firebaseAuth(authRef);
		auth.$onAuth(function(authUser){
			if(authUser){
				var userRegId=authUser.uid;
				$scope.user=userRegId;
				var ref=new Firebase("https://freshmanpackage.firebaseio.com/users/"+userRegId+"/shoppingCart/");
				//retrieving database information
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
			}else{
				$scope.totalAfterTax="Sorry! We've encountered an error. Please go back to shopping cart!";
			}
		});
	});
	//-----------------stripe code----------------------
	// This identifies your website in the createToken call below
    Stripe.setPublishableKey('pk_live_fBombq3sGyFCqrFUqtSM34mk');

    var stripeResponseHandler = function(status, response) {
      var $form = $('#payment-form');

      if (response.error) {
        // Show the errors on the form
        $form.find('.payment-errors').text(response.error.message);
        $form.find('button').prop('disabled', false);
      } else {
        // token contains id, last4, and card type
        var token = response.id;
        console.log(token);
        $form.append($('<input type="hidden" name="total" />').val($scope.totalAfterTax));
        // Insert the token into the form so it gets submitted to the server
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));
        // and re-submit
        // $form.get(0).submit();
        $scope.url='checkout.php';
        
        $http.post($scope.url,{"stripeToken":token,"total":$scope.totalAfterTax}).
        success(function(data,status){
          if(data=="success"){//payment goes through
          	var orderRef=new Firebase('https://freshmanpackage.firebaseio.com/orders');
  			   	var newOrderRef=orderRef.push({
      				"user":$scope.user,
  	    			"time":Firebase.ServerValue.TIMESTAMP,
              "name":$scope.cutomerName,
              "street":$scope.customerStreet,
              "cpu":$scope.customerCpu,
              "city":$scope.customerCity,
              "dorm":$scope.customerDorm,
              "date":$scope.customerDate,
              "phone":$scope.customerPhone,
              "total":$scope.totalAfterTax
  	    		});
  	    		var newOrderKey=newOrderRef.key();
  			   	var orderContent=orderRef.child(newOrderKey).child("content");
  			   	var orderObj=$firebaseObject(orderContent);

        		var userHistoryRef=new Firebase("https://freshmanpackage.firebaseio.com/users/"+$scope.user+"/history/"+newOrderKey);
        		var userHistoryObj=$firebaseObject(userHistoryRef);
        		userHistoryObj["key"]=newOrderKey;
        		userHistoryObj["time"]=Firebase.ServerValue.TIMESTAMP;
        		userHistoryObj.$save();

        		var userHisContentRef=new Firebase("https://freshmanpackage.firebaseio.com/users/"+$scope.user+"/history/"+newOrderKey+"/content");
        		var userHisContentObj=$firebaseObject(userHisContentRef);
        		


      			var userRef=new Firebase("https://freshmanpackage.firebaseio.com/users/"+$scope.user+"/shoppingCart/");
        		var userObject=$firebaseObject(userRef);
        		
        		var clearShoppingRef=new Firebase("https://freshmanpackage.firebaseio.com/users/"+$scope.user);
        		var clearShoppingObj=$firebaseObject(clearShoppingRef);

        		userObject.$loaded().then(function(){
	        		for(var prop in userObject){
	        			if(prop.search(/product/i)>=0){
	        				orderObj[prop]=userObject[prop];
	        				orderObj.$save();
	        				userHisContentObj[prop]=userObject[prop];
	        				userHisContentObj.$save();
	        			}
	        		}
	        		orderObj["key"]=newOrderKey;
	        		orderObj.$save();


	        		clearShoppingObj.$loaded().then(function(){
	        			delete clearShoppingObj.shoppingCart;
	        			clearShoppingObj.$save();
        			});
        		});
          	window.location.href='#/success/'+newOrderKey;
          		//payment goes through
          	}else{
  	        	alert(data);
  	        }
        }).
        error(function(data,status){
        	alert("Sorry! We have encountered an unexpected error. Your payment was not processed. Please go back to Shopping Cart, refresh page, and try again. If this error persists, please email us the error message below. Users who help us to improve our site will be rewarded by a $30 cash credit. error:"+data);
        });
      }
    };

    jQuery(function($) {
   	//------------JQPayment Validator Code---------
      $('.cc-number').payment('formatCardNumber');
      $('.cc-exp').payment('formatCardExpiry');
      $('.cc-cvc').payment('formatCardCVC');

      $.fn.toggleInputError = function(erred) {
        this.parent('.form-group').toggleClass('has-error', erred);
        return this;
      };

      //----------Stripe Code--------------------
      $('#payment-form').submit(function(e) {
      	//JQPayment Validator Code-----
      	// console.log($('.cc-exp').val());
        var cardType = $.payment.cardType($('.cc-number').val());
        $('.cc-number').toggleInputError(!$.payment.validateCardNumber($('.cc-number').val()));
        $('.cc-exp').toggleInputError(!$.payment.validateCardExpiry($('.cc-exp').payment('cardExpiryVal')));
        $('.cc-cvc').toggleInputError(!$.payment.validateCardCVC($('.cc-cvc').val(), cardType));
        $('.cc-brand').text(cardType);

        $('.validation').removeClass('text-danger text-success');
        $('.validation').addClass($('.has-error').length ? 'text-danger' : 'text-success');
        if($('.has-error').length!=0){
          // e.preventDefault();
          return false;
        }

		var exp_info=$('.cc-exp').val()
		exp_info=exp_info.replace(/\s/g, '');
		var month; var year;
    	var _ref = exp_info.split('/', 2), month = _ref[0], year = _ref[1];

    	var $form = $(this);

    	$form.append($('<input type="hidden" data-stripe="exp_month" />').val(month));
    	$form.append($('<input type="hidden" data-stripe="exp_year" />').val(year));

        //Strip Code-------      
        // Disable the submit button to prevent repeated clicks
        $form.find('button').prop('disabled', true);
        Stripe.card.createToken($form, stripeResponseHandler);
        // Prevent the form from submitting with the default action
        return false;
      });
    });
});