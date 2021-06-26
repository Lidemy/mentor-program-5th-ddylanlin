<?php 
// session_start();
require_once('conn.php');
require_once('utils.php');

$username = $_SESSION['username'];
$user =getUserFromUsername(); // 拿到 SESSION 裡 role 的資料
if ($user['role'] !== 'admin') {
  header('Location: index.php?errCode=4');
}

if (!empty($_GET['page'])) {
  $page = $_GET['page'];
} else {
  header('Location: index.php?errCode=4');
}


switch ($page) {
  case 'ALL':
    header('Location: admin.php');
  break;
  
  case 'Front-end':
    header('Location: admin.php?page=Front-end');
  break;

  case 'Back-end':
    header('Location: admin.php?page=Back-end');
  break;

  case 'Others':
    header('Location: admin.php?page=Others');
  break;

  case 'Bin':
    header('Location: admin.php?page=Bin');
  break;
  
  default:
    header('Location: admin.php');
  break;
}
?>


