<?php
session_start();
require_once('conn.php');

if (empty($_POST['nickname']) || empty($_POST['username']) || empty($_POST['password'])) {
  header('Location: register.php?errCode=1');
  die('Incomplete Input');
}

$nickname = $_POST['nickname'];
$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);


$sql = 'INSERT INTO Dylan_board_users(nickname, username, password) VALUES(?, ?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $nickname, $username, $password);
$result = $stmt->execute();

if (!$result) {
  print_r($conn->errno);
  if ($conn->errno === 1062) {
    header('Location: register.php?errCode=2');
  }
  die($conn->error);
}

$_SESSION['username'] = $username;
header('Location: index.php');
?>
