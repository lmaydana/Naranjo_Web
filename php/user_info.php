<?php
		try{
            session_start();
			if (!isset($_SESSION['user_id'])){
                echo "{}";
				return;
			}
			$base = new PDO("mysql:host=localhost; dbname=naranjo","root","");
			$base->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
			$base->exec("SET CHARACTER SET utf8");
			$sql = "SELECT user_name, privilege_level FROM users WHERE id = :user_id";
			$result = $base->prepare($sql);
			$result->bindValue(":user_id", $_SESSION["user_id"]);
			$result->execute();
			$registro=$result->fetch(PDO::FETCH_ASSOC);
			echo json_encode($registro);
			$result->closeCursor();

		}catch(Exception $e){

			die("Error:" . $e->getMessage());

		}
	?>