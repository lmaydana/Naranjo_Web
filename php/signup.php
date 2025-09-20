<?php
	function emailExists($pdo, $email) {
		$stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE mail = ?");
		$stmt->execute([$email]);
		return $stmt->fetchColumn() > 0;
	}

	function userExists($pdo, $user) {
		$stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE user_name= ?");
		$stmt->execute([$user]);
		return $stmt->fetchColumn() > 0;
	}
		try{
			$user = htmlentities(addslashes($_POST['user']));
			$pass = htmlentities(addslashes($_POST['passw']));
			$mail = htmlentities(addslashes($_POST['mail']));
			$pass_encryption = password_hash($pass, PASSWORD_DEFAULT, array("cost"=>12));
			$base = new PDO("mysql:host=localhost; dbname=naranjo","root","");
			$base->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
			$base->exec("SET CHARACTER SET utf8");
			$error_array = array();
			if (emailExists($base, $mail)){
				array_push($error_array, "email");
			}
			if (userExists($base, $user)){
				array_push($error_array, "user");
			}
			if (!empty($error_array)) {
				echo json_encode($error_array);
				return;
			}
			$sql = "INSERT INTO users(user_name, password, mail) VALUES (:user, :password, :mail)";
			$result = $base->prepare($sql);
			$result->execute(array(":user"=>$user,":password"=>$pass_encryption, ":mail"=>$mail));
			$result->closeCursor();
			echo "correct";
		}catch(Exception $e){
			die("Error:" . $e->getMessage());
		}
	?>