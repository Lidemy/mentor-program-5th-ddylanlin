<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>W11H2</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  

  <div class="login-board">

 
    <div class="lg-title">Register</div>

    <?php 
    if (!empty($_GET['errCode'])) {
      $code = $_GET['errCode'];
      $msg = 'Error';

      if ($code === '1') {
        $msg = 'Incomplete Input';
      } else if ($code === '2'){
        $msg = 'Username has been Registered';
      }
      echo '<h2>' . $msg . '</h2>';
    }
    ?>

    <form method="POST" action="handle_register.php">

      <div class='username'>
        <span>Username: </span>
        <input type="text" name="username" />
      </div>

      <div class='password'>
        <span>Password :  </span>
        <input type="password" name="password" />
      </div>
      
      <input class="submit-btn"type="submit" value="Submit"></input>

    </form>

    <a href="index.php">Back</a>
    <a href="login.php">Login</a>
    
  </div>

</body>
</html>
