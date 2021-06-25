<?php 
require_once('conn.php');
require_once('utils.php');

if (empty($_POST['content']) || empty($_POST['title'])){
  header('Location: edit_article.php?errCode=1&id=' . $_POST['id']);
  die('Incomplete Input');
} else if ($user['role'] !== 'admin') {
  header('Location: index.php?errCode=4');
}


$username = $_SESSION['username'];
$id = $_POST['id'];
$content = $_POST['content'];
$title = $_POST['title'];
$category = $_POST['category'];
$user =getUserFromUsername(); // 拿到 SESSION 裡 role 的資料

// 先抓出 CC table 裡的 username，之後要做比對

$result = sql(
  'SELECT * FROM Dylan_blog_articles WHERE id=?',
  'i', $id, NULL);
$row = $result->fetch_assoc();


// 做條件判斷，再執行更新命令
if (isPermit ($user, $row['username'])) {
 

$stmt = $conn->prepare('UPDATE Dylan_blog_articles SET content=? ,title=? ,category=? WHERE id=?');

$stmt->bind_param('sssi', $content, $title, $category, $id);

$result = $stmt->execute();
if (!$result){
  die($conn->error);
}
$result = $stmt->get_result();



header('Location: index.php');

}

?>
