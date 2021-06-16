<?php 
// session_start();
require_once('conn.php');
require_once('utils.php');

if (empty($_POST['content'])){
  header('Location: index.php?errCode=1');
  die('Incomplete Input');
}

// 自訂 token 用法
// $user = getUserFromToken();
// $username = $user['username'];
// $nickname = $user['nickname'];

$user = getUserFromUsername();
$username = $_SESSION['username'];
$nickname = $user['nickname'];
$content = $_POST['content'];

$sql = sprintf(
  'INSERT INTO Dylan_board_comments(nickname, content) VALUES("%s", "%s")',
  $nickname,
  $content
);

$result = $conn->query($sql);
if (!$result){
 die($conn->error);
}

header('Location: index.php');
?>
