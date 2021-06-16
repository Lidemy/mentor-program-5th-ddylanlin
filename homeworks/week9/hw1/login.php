<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>W9H1</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  
  <header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>

  <div class="board">

    <a href="index.php">Back</a>
    <a href="register.php">Register</a>
    <div class="title">Login</div>

    <?php 
    if (!empty($_GET['errCode'])) {
      $code = $_GET['errCode'];
      $msg = 'Error';

      if ($code === '1') {
        $msg = 'Incomplete Input';
      } else if ($code === '3'){
        $msg = 'Username or Password is incorrect';
      }
      echo '<h2>' . $msg . '</h2>';
    }
    ?>

    <form method="POST" action="handle_login.php">

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
    
  </div>

</body>
</html>
