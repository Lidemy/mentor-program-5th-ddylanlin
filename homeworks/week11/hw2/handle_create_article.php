<?php 
// session_start();
require_once('conn.php');
require_once('utils.php');

if (empty($_POST['content'])){
  header('Location: create_article.php?errCode=1');
  die('Incomplete Input');
} else if ($user['role'] !== 'admin') {
  header('Location: index.php?errCode=4');
}

$user =getUserFromUsername();
$username = $_SESSION['username'];
$content = $_POST['content'];


sql(
'INSERT INTO Dylan_blog_articles(username, content) VALUES(?, ?)',
'ss', $username ,$content);


header('Location: index.php');
?>


