<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
</head>
<body>

    <?php
    include 'logout.php';

    if (isset($_SESSION['username'])) {
        echo 'You are already logged in with session. Welcome, ' . $_SESSION['username'] . '!';
        echo '<br><a href="index.php?logout_session=true">Logout from Session</a>';
    } else {
    ?>
    <form action="process.php" method="post">
        <label for="sessionUsername">Enter Your Name for Session:</label>
        <input type="text" id="sessionUsername" name="sessionUsername">
        <button type="submit">Submit for Session</button>
    </form>
    <?php
    }

    if (isset($_COOKIE['username'])) {
        echo 'You are already logged in with cookie. Welcome, ' . $_COOKIE['username'] . '!';
        echo '<br><a href="index.php?logout_cookie=true">Logout from Cookie</a>';
    } else {
    ?>
    <form action="process.php" method="post">
        <label for="cookieUsername">Enter Your Name for Cookie:</label>
        <input type="text" id="cookieUsername" name="cookieUsername">
        <button type="submit">Submit for Cookie</button>
    </form>
    <?php
    }
    if (isset($_SESSION['username']) || isset($_COOKIE['username'])) {
        echo '<br><a href="profile.php">Back to Profile</a>';
    }
    ?>
    

</body>
</html>