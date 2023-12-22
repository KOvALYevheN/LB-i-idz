<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile Page</title>
</head>
<body>

    <?php
    include 'logout.php';

    if (isset($_SESSION['username']) || isset($_COOKIE['username'])) {
        if (isset($_SESSION['username'])) {
            echo 'Username from Session: ' . $_SESSION['username'];
            echo '<br><a href="profile.php?logout_session=true">Logout from Session</a>';
        } else {
            echo '<br>You are not logged in with "session"';
            echo '<br><a href="index.php">Login with Session</a>';
        }

        if (isset($_COOKIE['username'])) {
            echo '<br>Username from Cookie: ' . $_COOKIE['username'];
            echo '<br><a href="profile.php?logout_cookie=true">Logout from Cookie</a>';
        } else {
            echo '<br>You are not logged in with "cookie"';
            echo '<br><a href="index.php">Login with Cookie</a>';
        }
    }  else {
        echo 'You are not logged in. Please log in using one of the methods below:';
        echo '<br><a href="index.php">Login with Session</a>';
        echo '<br><a href="index.php">Login with Cookie</a>';
    }
    ?>

</body>
</html>