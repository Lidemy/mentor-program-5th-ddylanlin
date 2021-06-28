<?php 
require_once('conn.php');
require_once('utils.php');


if (empty($_POST['role']) || empty($_GET['id'])) {
  header('Location: admin.php?Code=1');
  die('Nothing Update');
}


$username = $_SESSION['username'];
$user = getUserFromUsername();
$role = $_POST['role'];
$id = $_GET['id'];


if (isPermit ($user, NULL)) {
  sql('UPDATE Dylan_board_users SET role=? WHERE id=?',
  'si', $role, $id);

  header('Location: admin.php?Code=2');
  // Update Successed
}
?>
