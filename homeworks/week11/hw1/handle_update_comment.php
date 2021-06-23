<?php 
require_once('conn.php');
require_once('utils.php');

if (empty($_POST['content'])) {
  header('Location: update_comment.php?errCode=1&id=' . $_POST['id']);
  die('Incomplete Input');
}


$username = $_SESSION['username'];
$id = $_POST['id'];
$content = $_POST['content'];
$user =getUserFromUsername(); // 拿到 SESSION 裡 role 的資料

// 先抓出 CC table 裡的 username，之後要做比對

$result = sql(
  'SELECT * FROM Dylan_board_comments WHERE id=?',
  'i', $id, NULL);
$row = $result->fetch_assoc();


// 做條件判斷，再執行更新命令
if (isPermit ($user, $row['username']) || $user['role'] === 'editor') {
 
sql('UPDATE Dylan_board_comments SET content=? WHERE id=?',
'si', $content ,$id);

header('Location: index.php');

}

?>
