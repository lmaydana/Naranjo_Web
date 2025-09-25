<?php
    require_once 'db_config.php';
    function secure_query($sql, $bind_array) {
        try{
            $base = new PDO("mysql:host=".DB_HOST."; dbname=".DB_NAME,DB_USER,DB_PASS);
            $base->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $base->exec("SET CHARACTER SET utf8mb4");
            $base->exec("SET NAMES utf8mb4");
            $result = $base->prepare($sql);
            $types = [true=>PDO::PARAM_INT, false=>PDO::PARAM_STR];
            foreach ($bind_array as $key => $value) {
                $result->bindValue($key, $value, $types[is_numeric($value)]);
            }
            
            $result->execute();
            $objects = array();
            while($product=$result->fetch(PDO::FETCH_ASSOC)){
                array_push($objects, $product);
            }
            $result->closeCursor();
            return $objects;

        }catch(Exception $e){

            die("Error:" . $e->getMessage());
            return [];
        }
    }
?>