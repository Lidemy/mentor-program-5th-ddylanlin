<?php 
require_once('conn.php');
require_once('utils.php');

$id = $_GET['id'];
$username = $_SESSION['username'];
$user =getUserFromUsername(); // 拿到 SESSION 裡 role 的資料
if ($user['role'] !== 'admin') {
  header('Location: index.php?errCode=4');
}




// 先抓出 CC table 裡的 username，之後要做比對
$result = sql(
  'SELECT * FROM Dylan_blog_articles WHERE id=?',
  'i', $id, NULL);
$row = $result->fetch_assoc();


// 做條件判斷，再執行更新命令
if (isPermit ($user, $row['username'])) {
 
  sql('UPDATE Dylan_blog_articles SET is_deleted=1 WHERE id=?',
  'i', $id, NULL);

  header('Location: index.php');
}


?>


