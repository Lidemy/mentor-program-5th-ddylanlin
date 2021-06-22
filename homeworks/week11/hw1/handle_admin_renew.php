<?php 
require_once('conn.php');
require_once('utils.php');


if (empty($_POST['role']) || empty($_GET['id'])) {
  header('Location: admin.php?Code=1');
  die('Nothing Update');
}


$username = $_SESSION['username'];
$role = $_POST['role'];
$id = $_GET['id'];


$sql = 'UPDATE Dylan_board_users SET role=? WHERE id=?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('si', $role, $id);
$result = $stmt->execute();
if (!$result){
 die($conn->error);
}

header('Location: admin.php?Code=2');
// Update Successed
?>
