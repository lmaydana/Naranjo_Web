<?php
    session_start();
    $cart = $_SESSION['shopping_cart'];
    echo json_encode($cart);
?>