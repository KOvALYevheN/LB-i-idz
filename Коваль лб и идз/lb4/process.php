<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['sessionUsername'])) {
        $sessionUsername = $_POST['sessionUsername'];
        $_SESSION['username'] = $sessionUsername;
    }

    if (isset($_POST['cookieUsername'])) {
        $cookieUsername = $_POST['cookieUsername'];
        setcookie('username', $cookieUsername, time() + 86400, '/');
    }

    header('Location: profile.php');
    exit();
} else {
    echo 'Oops! Something went wrong.';
}
?>