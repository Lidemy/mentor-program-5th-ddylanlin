<?php 
// session_start();
require_once('conn.php');
require_once('utils.php');

if (empty($_POST['content']) || empty($_POST['title'])){
  header('Location: create_article.php?errCode=1');
  die('Incomplete Input');
} else if ($user['role'] !== 'admin') {
  header('Location: index.php?errCode=4');
}

$user =getUserFromUsername();
$username = $_SESSION['username'];
$content = $_POST['content'];
$title = $_POST['title'];

if (empty($_POST['category'])) {
  $category = 'Uncategorized';
} else {
  $category = $_POST['category'];
}


$stmt = $conn->prepare('INSERT INTO Dylan_blog_articles(username, content,title, category) VALUES(?, ?, ?, ?)');

$stmt->bind_param('ssss', $username ,$content, $title, $category);

$result = $stmt->execute();
if (!$result){
  die($conn->error);
}
$result = $stmt->get_result();


header('Location: index.php');
?>


