<?php
    session_start();
    $id = $_POST["productId"];
    unset($_SESSION["shopping_cart"][(int)$id]);
?>