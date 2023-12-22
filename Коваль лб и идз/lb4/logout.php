<?php
session_start();

if (isset($_GET['logout_session'])) {
    unset($_SESSION['username']);
    header('Location: index.php');
    exit();
}

if (isset($_GET['logout_cookie'])) {
    setcookie('username', '', time() - 1, '/');
    header('Location: index.php');
    exit();
}
?>