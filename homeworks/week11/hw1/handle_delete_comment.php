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
$stmt = $conn->prepare('SELECT * FROM Dylan_board_comments WHERE id=?');
$stmt->bind_param('i', $id);
$result = $stmt->execute();
if (!$result){
 die($conn->error);
}
$result = $stmt->get_result();
$row = $result->fetch_assoc();
print_r($row);

// 做條件判斷，再執行更新命令
if ($row['username'] === $username || $user['role'] === 'admin') {
  $sql = 'UPDATE Dylan_board_comments SET is_deleted=1 WHERE id=?';

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if (!$result){
  die($conn->error);
  }

  header('Location: index.php');

}






?>
