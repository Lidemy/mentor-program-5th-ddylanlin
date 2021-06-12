<?php
session_start();
require_once('conn.php');

function randomToken()
{
 $s = '';
 for ($i = 1; $i <= 16; $i++) {
  $s .= chr(rand(65, 90));
 }
 return $s;
}

function getUserFromToken(){
 global $conn;

// 用token 拿取 username 
 $token_sql = sprintf(
  'SELECT username FROM Dylan_board_tokens WHERE token="%s"',
  $_COOKIE['token']
 );
 $token_result = $conn->query($token_sql);
 $token_row = $token_result->fetch_assoc();
 $username = $token_row['username'];

// 用username 拿取 user全部資料
 $user_sql = sprintf(
  'SELECT * FROM Dylan_board_users WHERE username="%s"',
  $username
 );
 $user_result = $conn->query($user_sql);
 $user_row = $user_result->fetch_assoc();
 
 return $user_row;
}

function getUserFromUsername(){
 global $conn;
 $sql = sprintf(
  'SELECT * FROM Dylan_board_users WHERE username="%s"',
  $_SESSION['username']
 );
 $result = $conn->query($sql);
 $row = $result->fetch_assoc();
 
 return $row;
}
