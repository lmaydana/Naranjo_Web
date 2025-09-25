<?php
    require('query_sql.php');
    $products = secure_query("SELECT * FROM products ORDER BY id DESC LIMIT :amount", array(":amount"=>$_POST["amount"]));
    echo json_encode($products);
?>