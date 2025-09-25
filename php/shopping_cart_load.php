<?php
    require("query_sql.php");
    $id = $_POST["product_id"];
    $amount = $_POST["product_amount"];
    $result = secure_query("SELECT product_name, price*:amount as price FROM products WHERE id = :id", array(":amount"=>$amount, ":id"=>$id));
    session_start();
    $product_info = $result[0];
    $name = $product_info["product_name"];
    $subtotal = $product_info["price"];
    if(isset($_SESSION["shopping_cart"][$id])){
        $_SESSION["shopping_cart"][$id]["amount"] += $amount;
        $_SESSION["shopping_cart"][$id]["subtotal"] += $subtotal;
    } else {
        $_SESSION["shopping_cart"][$id] = ["name"=>$name, "amount"=>$amount, "subtotal"=>$subtotal];
    }
    echo "correct";
?>