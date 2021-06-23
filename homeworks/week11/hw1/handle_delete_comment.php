<?php 
require_once('conn.php');
require_once('utils.php');

if (empty($_GET['id'])) {
  header('Location: index.php?errCode=1');
  die('Incomplete Input');
}


$id = $_GET['id'];
$username = $_SESSION['username'];
$user =getUserFromUsername(); // 拿到 SESSION 裡 role 的資料



// 先抓出 CC table 裡的 username，之後要做比對
$result = sql(
  'SELECT * FROM Dylan_board_comments WHERE id=?',
  'i', $id, NULL);
$row = $result->fetch_assoc();


// 做條件判斷，再執行更新命令
if (isPermit ($user, $row['username'])) {
 
  sql('UPDATE Dylan_board_comments SET is_deleted=1 WHERE id=?',
  'i', $id, NULL);

  header('Location: index.php');
}


?>


