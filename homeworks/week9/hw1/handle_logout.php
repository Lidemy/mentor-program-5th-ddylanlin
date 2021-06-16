<?php
session_start();
session_destroy();

// 自訂 token 用法
// require_once('conn.php');
// $token = $_COOKIE['token'];
// $sql = sprintf(
//  'DELETE FROM tokens WHERE token="%s"',
//  $token
// );
// $conn->query($sql);
// setCookie('token', '', time()-1);

header('Location: index.php');

?>
