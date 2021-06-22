<?php
session_start();
require_once('conn.php');


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

function escape($str) {
  return htmlspecialchars($str, ENT_QUOTES);
}
