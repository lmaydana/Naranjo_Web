<?php

    require('db_config.php');
	function nameExists($pdo, $name) {
		$stmt = $pdo->prepare("SELECT COUNT(*) FROM products WHERE product_name = ?");
		$stmt->execute([$name]);
		return $stmt->fetchColumn() > 0;
	}
    try{
        session_start();
        $error_array = array();
        if(!isset($_SESSION['privilege_level']) || $_SESSION['privilege_level'] == 0) {
            array_push($error_array, "wrongPrivilege");
            echo json_encode($error_array);
            return;
        }
        $product_name = htmlentities(addslashes($_POST['product_name']));
        $price = htmlentities(addslashes($_POST['price']));
        $description = htmlentities(addslashes($_POST['description']));
        $product_type = htmlentities(addslashes($_POST['type']));
        $work = htmlentities(addslashes($_POST['work']));
        $amount_per_work = htmlentities(addslashes($_POST['pieces']));
        $image = $_FILES['image'];
        $save_folder = $_SERVER['DOCUMENT_ROOT'] . '/trabajos/naranjo/imgs/products_images/';
        $formatted_new_name = str_replace(" ","_",$product_name);
        $splitted = explode(".", $image['name']);
        $type = end($splitted);
        move_uploaded_file($image['tmp_name'], $save_folder.$formatted_new_name.".".$type);
        $base = new PDO("mysql:host=".DB_HOST."; dbname=".DB_NAME,DB_USER,DB_PASS);
        $base->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        $base->exec("SET CHARACTER SET utf8mb4");
        $base->exec("SET NAMES utf8mb4");
        if (nameExists($base, $product_name)){
            array_push($error_array, "nameExists");
        }
        if (!empty($error_array)) {
            echo json_encode($error_array);
            return;
        }
        $sql = "INSERT INTO products(product_name, type, price, description, workounter, image_type) VALUES (:name, :type, :price, :description, :work, :image_type)";
        $result = $base->prepare($sql);
        $result->execute(array(":name"=>$product_name,":type"=>$product_type,":price"=>$price, ":description"=>$description, ":work"=>($work/$amount_per_work), ":image_type"=>$type));
        $result->closeCursor();
        echo "correct";
        //header("Location:../loadProducts.html");
    }catch(Exception $e){
        die("Error:" . $e->getMessage());
    }
?>