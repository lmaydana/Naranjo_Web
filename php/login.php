<?php
	require('db_config.php');
	try{
		
		if (isset($_SESSION['user_id'])){
			echo "sucess";
			return;
		}

		$user = htmlentities( addslashes( $_POST['user'] ) );
		$password = htmlentities( addslashes( $_POST['passw'] ) );

		$base = new PDO("mysql:host=".DB_HOST."; dbname=".DB_NAME,DB_USER,DB_PASS);
		$base->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
		$base->exec("SET CHARACTER SET utf8");
		$sql = "SELECT * FROM users WHERE user_name = :user";
		$result = $base->prepare($sql);
		$result->bindValue(":user", $user);
		$result->execute();
		$registro=$result->fetch(PDO::FETCH_ASSOC);

		if(!password_verify($password,$registro["password"] )){
			echo "fail";
			$result->closeCursor();
			return;
		}

		session_start();
		$_SESSION['user_id'] = $registro["id"];
		$_SESSION['shopping_cart'] = array();
		$_SESSION['privilege_level'] = $registro['privilege_level'];
		echo "success";
		$result->closeCursor();

	}catch(Exception $e){

		die("Error:" . $e->getMessage());

	}
	?>