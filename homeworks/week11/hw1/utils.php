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


function sql($prepare, $type, $str1, $str2) {
  global $conn; 
  $stmt = $conn->prepare($prepare);

  if ($str2 === NULL) {
    $stmt->bind_param($type, $str1);
  } else if ($str2 !== NULL) {
    $stmt->bind_param($type, $str1 ,$str2);
  }

  $result = $stmt->execute();
  if (!$result){
   die($conn->error);
  }
  $result = $stmt->get_result();
  return $result;
}

function sqlGet($prepare) {
  global $conn; 
  $stmt = $conn->prepare($prepare);
  $result = $stmt->execute();
  if (!$result){
   die($conn->error);
  }
  $result = $stmt->get_result();
  return $result;
}

function isPermit($user, $comment){
  if (empty($user['username'])) {
    return false;
  } else if ($user['role'] === 'admin') {
    return true;
  } else {
    return ($comment === $user['username']);
  } 
    

  
}

?>

