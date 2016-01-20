<?php

if(isset($_POST["submit"])){
	if(!isset($_POST["email"]) || empty($_POST["email"])){
		die("Please Enter an Email for Your Account!");
	}
	if(!isset($_POST["password"]) || empty($_POST["password"])){
		die("Please Enter a password!");
	}

	if($_POST["permission"]=="SUMMER"){
		$db=mysqli_connect("localhost","zinosama_admin","blingstarBANANAstorage912!","zinosama_mobile");

		$email=mysqli_real_escape_string($db, $_POST["email"]);
		$firstName=mysqli_real_escape_string($db, $_POST["firstName"]);
		$lastName=mysqli_real_escape_string($db, $_POST["lastName"]);
		$street=mysqli_real_escape_string($db, $_POST["street"]);
		$city=mysqli_real_escape_string($db, $_POST["city"]);
		$state=mysqli_real_escape_string($db, $_POST["state"]);
		$zipcode=mysqli_real_escape_string($db, $_POST["zipcode"]);		
		$password=mysqli_real_escape_string($db, $_POST["password"]);
		$cardNumber=mysqli_real_escape_string($db,$_POST["card-number"]);
		$expMonth=mysqli_real_escape_string($db,$_POST["exp-month"]);
		$expYear=mysqli_real_escape_string($db,$_POST["exp-year"]);
		$cvc=mysqli_real_escape_string($db,$_POST["cvc"]);
		$query=" INSERT INTO zhuce VALUES ('$email','$password','$lastName','$firstName','$street','$city','$state','$zipcode','$cardNumber','$expMonth','$expYear','$cvc')";
		$result=mysqli_query($db,$query);
		if(!$result){
			// die("database access failed: ".mysqli_error($db));
		}else{
			header("Location: success.php");
		}
	}else{
		die("incorrect varification");
	}
	mysqli_close($db);

}

?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Mobile Registration</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<script src="http://code.jquery.com/jquery-latest.min.js"/></script>
	<script src="js/bootstrap.min.js"/></script>
	<style>
		body{
			padding-top:50px;
		}
		.navbar_rightmost{
			padding-right: 20px;
		}
		.higher-group{
			padding-top:20px;

		}
		.lower-group{
			padding-bottom: 25px;
			padding-top:10px;
		}
		.middle-grouP{
			padding-top: 10px;
		}
		label{
			font-size: 20px;
		}
		h1{
			text-align: center;
			color: #337AB7;
		}
		.smallTitle{
			color:orange;
			font-size:20px;
		}
		.topText{
			text-align: right;
			font-size:12px;
		}
		#price_tab{
			color:red;
		}
		#price_tab:hover{
			color:rgb(255, 157, 157);
		}
	</style>
</head>
<body>
	<header>
		<nav class="navbar navbar-default navbar-inverse navbar-fixed-top" role="navigation">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#collapseA">
				<span class="sr-only">Toggle navigatin</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				</button>
			</div>

			<div class="collapse navbar-collapse" id="collapseA">
				<ul class="nav navbar-nav">
					<li class="active"><a href="index.php">Mobile Service</a></li>
					<li><a href="about.php">contact</a></li>
				</ul>
			</div>
		</nav>
	</header>
	<h1>Order SIM Card <span class="smallTitle">BETA</span></h1>
	<p class="topText">Apologies for our appearances. Our site is currently under construction. Nevertheless, this page is secure and fully functional.</p>
	<div class="container">
		<form class="form-horizontal higher-group" action="index.php" method="post">
			<h2>Account Info</h2>
			<div class="form-group">
				<label for="email" class="col-sm-2 control-label">Email/Account </label>
				<div class="col-sm-10">
					<input type="email" class="form-control" name="email" id="email" >
				</div> 
			</div>
			<div class="form-group middle-group">
				<label for="password" class="col-sm-2 control-label">Password</label>
				<div class="col-sm-10">
					<input type="password" class="form-control"  id="password" name="password"/>
				</div>
			</div>
			<div class="form-group middle-group">
				<label for="firstName" class="col-sm-2 control-label">First Name</label>
				<div class="col-sm-10">
					<input type="text" class="form-control"  name="firstName" id="firstName">
				</div>
			</div>
			<div class="form-group middle-group">
				<label for="lastName" class="col-sm-2 control-label">Last Name</label>
				<div class="col-sm-10">
					<input type="text" class="form-control"  name="lastName" id="lastName">
				</div>
			</div>
			<hr>
			<h2>Shipping Info</h2>
			<div class="form-group middle-group">
				<label for="street" class="col-sm-2 control-label">Street Address</label>
				<div class="col-sm-10">
					<input type="text" class="form-control"  name="street" id="street">
				</div>
			</div>
			<div class="form-group middle-group">
				<label for="city" class="col-sm-2 control-label">City</label>
				<div class="col-sm-10">
					<input type="text" class="form-control"  name="city" id="city">
				</div>
			</div>
			<div class="form-group middle-group">
				<label for="state" class="col-sm-2 control-label">State</label>
				<div class="col-sm-10">
					<input type="text" class="form-control"  name="state" id="state">
				</div>
			</div>
			<div class="form-group middle-group">
				<label for="zipcode" class="col-sm-2 control-label">Zip Code</label>
				<div class="col-sm-10">
					<input type="text" class="form-control"  name="zipcode" id="zipcode">
				</div>
			</div>
			<hr>
			<h2>Payment Info</h2>
			<div class="form-group middle-group">
				<label for="card-number" class="col-sm-2 control-label">Credit Card Number</label>
				<div class="col-sm-10">
					<input type="text" class="form-control"  name="card-number" id="card-number"><small>Notice: Your payment information will be securely stored on our server for less than 24 hours, before it is permanently deleted.</small>
				</div>
			</div>
			<div class="form-group middle-group">
				<label for="exp-month" class="col-sm-2 control-label">Exp. Month</label>
				<div class="col-sm-10">
					<input type="text" class="form-control"  name="exp-month" id="exp-month">
				</div>
			</div>
			<div class="form-group middle-group">
				<label for="exp-year" class="col-sm-2 control-label">Exp. Year</label>
				<div class="col-sm-10">
					<input type="text" class="form-control"  name="exp-year" id="exp-year">
				</div>
			</div>
			<div class="form-group middle-group">
				<label for="cvc" class="col-sm-2 control-label">CVC</label>
				<div class="col-sm-10">
					<input type="password" class="form-control"  name="cvc" id="cvc">
				</div>
			</div>
			<div class="form-group middle-group">
				<label for="permission" class="col-sm-2 control-label">Permission Code</label>
				<div class="col-sm-10">
					<input type="text" class="form-control"  name="permission" id="permission">
				</div>
			</div>
			<hr>
			<small>All orders may be subject to local charges. Any customs or import duties and associated fees are charged once the parcel reaches its destination country. 
			These charges must be paid by the recipient of the parcel.<br>	
			We have no control over these charges and cannot predict what they may be. For further information we suggest contacting your local customs office.<br>
			Please note all online orders are shipped from our central warehouse in Maryland. This is to provide a more efficient and quicker delivery worldwide. By accepting our terms and conditions you are agreeing to these conditions.</small>
			<button class="btn btn-primary btn-lg btn-block" type="submit" name="submit">I'VE READ AND ACCEPT THE TERMS AND CONDITIONS</button>
		</form>
	</div>
</body>
</html>
