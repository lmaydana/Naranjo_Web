<?php
require("query_sql.php");
$products = secure_query("SELECT price FROM products WHERE id = :id", array(":id"=>$_POST["product_id"]));
echo json_encode($products);
?>