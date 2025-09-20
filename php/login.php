<?php
		try{

			if (isset($_SESSION['user_id'])){
				header('Location:index.html');
			}

			$user = htmlentities( addslashes( $_POST['user'] ) );
			$password = htmlentities( addslashes( $_POST['contra'] ) );
			$counter = 0;

			$base = new PDO("mysql:host=localhost; dbname=pruebas","root","");
			$base->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
			$base->exec("SET CHARACTER SET utf8");
			$sql = "SELECT * FROM users WHERE user_name = :user";
			$result = $base->prepare($sql);
			$result->bindValue(":user", $user);
			$result->execute();

			while($registro=$result->fetch(PDO::FETCH_ASSOC)){

				if(password_verify($password,$registro["password"] )){

					$counter++;

				}

			}
			if($counter > 0){
				session_start();
				$_SESSION['user_id'] = $registro['id'];
				$_SESSION['shopping_cart'] = array();
				echo "success";
			}else{
				echo "fail";
			}
			
			$result->closeCursor();

		}catch(Exception $e){

			die("Error:" . $e->getMessage());

		}
	?>