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

$result = sql(
  'SELECT * FROM Dylan_blog_users WHERE username=?',
  's', $username, NULL);

if ($result->num_rows === 0) {
  header('Location: login.php?errCode=3'); 
  // errCode=3 Username or Password is Incorrect
  exit();
}

$row = $result->fetch_assoc();
if (password_verify($password, $row['password'])) {
  $_SESSION['username'] = $username;
  header('Location: index.php');
} else {
  header('Location: login.php?errCode=3');
}
