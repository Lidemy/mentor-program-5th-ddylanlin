<?php
// session_start();
require_once('conn.php');
require_once('utils.php');

$id = $_GET['id'];
$username = NULL;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $user = getUserFromUsername();
}

$result = sql('SELECT * FROM Dylan_board_comments WHERE id=?',
'i', $id, NULL);
$row = $result->fetch_assoc();

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>W10H1</title>
  <link rel="stylesheet" href="style.css">
</head

<body>

  <header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>

  <div class="board">

    <?php if (!$username) { ?>
      <a href="register.php">Register</a>
      <a href="login.php">Login</a>
    <?php } else { ?>
      <a href="index.php">Back</a>
      <h3 class="show-name">Hi, <?php echo escape($user['nickname']); ?></h3>
    <?php } ?>

    <div class="title">Edit Comment</div>
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

    <form method="POST" action="handle_update_comment.php">
      <textarea name="content" id="" cols="30" rows="10"><?php echo escape($row['content'])?></textarea>
      <input type="hidden" name="id" value="<?php echo escape($row['id']) ?>" />
      <?php if ($username) { ?>
        <input class="submit-btn" type="submit" value="Submit"></input>
      <?php } ?>
    </form>

  </div>
</body>

</html>