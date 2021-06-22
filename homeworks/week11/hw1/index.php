<?php
// session_start();
require_once('conn.php');
require_once('utils.php');


$username = NULL;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $user = getUserFromUsername();
}

$page = 1;
if (!empty($_GET['page'])) {
  $page = $_GET['page'];
}
$items_per_page = 10;
$offset = ($page-1) * $items_per_page;

$stmt = $conn->prepare('SELECT 
CC.id AS id, CC.content AS content, CC.created_at AS created_at, 
UU.nickname AS nickname, UU.username AS username 
FROM Dylan_board_comments AS CC 
LEFT JOIN Dylan_board_users AS UU 
ON CC.username = UU.username 
WHERE CC.is_deleted=0 
ORDER BY CC.id DESC 
LIMIT ? OFFSET ?');

$stmt->bind_param('ii', $items_per_page, $offset);

$result = $stmt->execute();
if (!$result) {
  die('Error: ' . $conn->error);
}
$result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>W11H1</title>
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
      <a href="#" class="change-nickname-btn">Change Nickname</a>
      <form class="hide" method="POST" action="handle_update_user.php">
        <div>
          <span>Change Nickname :  </span>
          <input type="text" name="nickname" />
        </div>
      <input class="submit-btn update-nickname-btn"type="submit" value="Change"></input>
    </form>

      <h3 class="show-name">Hi, <?php echo escape($user['nickname']); ?></h3>
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
            <div class="comment-info">
              <?php echo escape($row['nickname']) ?>
            (@<?php echo escape($row['username']) ?>)
              <span><?php echo escape($row['created_at']) ?></span>
              <?php if ($row['username'] === $username) {?>
              <a href="update_comment.php?id=<?php echo escape($row['id'])?>" id="edit-btn">edit</a>
              <a href="handle_delete_comment.php?id=<?php echo escape($row['id'])?>" id="edit-btn">delete</a>
              <?php }?>
            </div>
            <div class="comment-desc"><?php echo escape($row['content']) ?></div>
          </div>
        </div>
      <?php } ?>
    </section>

    <hr size="0.1rem" align="center" width="100%">

    
    <?php 
    $stmt = $conn->prepare('SELECT count(id) AS count FROM Dylan_board_comments WHERE is_deleted=0');
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $count = $row['count'];
    $total_page = ceil($count / $items_per_page);
    ?>
    <div class="page-info">
      <span>Total <span style="color:rgb(180, 143, 214);font-size:1.2rem;"><?php echo $count ?></span> comments，Page </span>
      <span style="color:rgb(180, 143, 214);font-size:1.2rem;"><?php echo $page ?></span><span> / <?php echo $total_page?></span>
    </div>
    <div class="paginator">
      <?php if ($page != 1) { ?>
        <a href="index.php?page=1">Home</a>
        <a href="index.php?page=<?php echo $page - 1?>">Previous</a>
      <?php } ?>
      <?php if ($page != $total_page) { ?>
        <a href="index.php?page=<?php echo $page + 1?>">Next</a>
        <a href="index.php?page=<?php echo $total_page?>">End</a>
      <?php } ?>
  </div>

</body>

<script>
  document.querySelector('.change-nickname-btn').addEventListener('click' ,(e) =>{
    e.target.nextElementSibling.classList.toggle('hide')
  })

</script>

</html>