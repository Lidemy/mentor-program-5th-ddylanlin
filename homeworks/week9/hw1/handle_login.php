<?php
session_start();
require_once('conn.php');
require_once('utils.php');

if (empty($_POST['username']) || empty($_POST['password'])) {
  header('Location: login.php?errCode=1');
  die('Incomplete Input');
}

$username = $_POST['username'];
$password = $_POST['password'];

$sql = sprintf(
  'SELECT * FROM Dylan_board_users WHERE username="%s" AND password="%s"',
  $username,
  $password
);

$result = $conn->query($sql);
if (!$result) {
  die($conn->error);
}

if ($result->num_rows > 0) {

  // 自訂 token 用法
  // // 建立token並儲存
  // $token = randomToken();
  // $sql = sprintf(
  //   'INSERT INTO tokens(token, username) VALUES ("%s", "%s")',
  //   $token,
  //   $username
  // );
  // $result = $conn->query($sql);
  // if (!$result) {
  //   die($conn->error);
  // }
  // $expire = time() + 3600 * 24 * 30;
  // setCookie('token', $token, $expire);

  $_SESSION['username'] = $username;

  header('Location: index.php');
} else {
  header('Location: login.php?errCode=3');
}
