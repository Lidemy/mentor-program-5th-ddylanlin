<?php 
// session_start();
require_once('conn.php');
require_once('utils.php');

if (empty($_POST['content'])){
  header('Location: index.php?errCode=1');
  die('Incomplete Input');
}


$username = $_SESSION['username'];
$content = $_POST['content'];



sql(
'INSERT INTO Dylan_board_comments(username, content) VALUES(?, ?)',
'ss', $username ,$content);

// $sql = 'INSERT INTO Dylan_board_comments(username, content) VALUES(?, ?)';
// $stmt = $conn->prepare($sql);
// $stmt->bind_param('ss', $username ,$content);
// $result = $stmt->execute();
// if (!$result){
//  die($conn->error);
// }

header('Location: index.php');
?>


