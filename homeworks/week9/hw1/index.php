<?php
// session_start();
require_once('conn.php');
require_once('utils.php');

$result = $conn->query('SELECT * FROM Dylan_board_comments ORDER BY id DESC');
if (!$result) {
  die('Erroe: ' . $conn->error);
}

// 自訂 token 用法
// $userCookie = NULL;
// if (!empty($_COOKIE['token'])) {
//   $userCookie = $_COOKIE['token'];

//   $user = getUserFromToken();
//   $username = $user['username'];
//   $nickname = $user['nickname'];
// }

$username = NULL;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];

  $user = getUserFromUsername();
  $nickname = $user['nickname'];
}

?>

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

    <?php if (!$username) { ?>
      <a href="register.php">Register</a>
      <a href="login.php">Login</a>
    <?php } else { ?>
      <a href="handle_logout.php">Logout</a>
      <h3 class="show-name">Hi, <?php echo $nickname; ?></h3>
    <?php } ?>


    <div class="title">Comments</div>
    <?php
    if (!empty($_GET['errCode'])) {
      $code = $_GET['errCode'];
      $msg = 'Error';

      if ($code === '1') {
        $msg = 'Incomplete Input';
      }
      echo '<h2>' . $msg . '</h2>';
    }
    ?>

    <form method="POST" action="handle_add_comment.php">

      <textarea name="content" id="" cols="30" rows="10"></textarea>

      <?php if ($username) { ?>
        <input class="submit-btn" type="submit" value="Submit"></input>
      <?php } else { ?>
        <h3>Login to comment</h3>
      <?php } ?>
    </form>

    <hr size="0.1rem" align="center" width="100%">

    <section>
      <?php while ($row = $result->fetch_assoc()) { ?>
        <div class="comment">
          <div class="comment-avatar"></div>
          <div class="comment-content">
            <div class="comment-info"><?php echo $row['nickname'] ?>
              <span><?php echo $row['created_at'] ?></span>
            </div>
            <div class="comment-desc"><?php echo $row['content'] ?></div>
          </div>
        </div>
      <?php } ?>
    </section>

  </div>

</body>

</html>