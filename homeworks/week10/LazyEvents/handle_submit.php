<?php
require_once('conn.php');



$nickname = $_POST['nickname'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$type = $_POST['type'];
$how = $_POST['how'];
$others = $_POST['others'];

$sql = sprintf(
 'INSERT INTO Dylan_Lazy_Events(nickname, email, phone, type, how, others) VALUES ("%s", "%s", "%s", "%s", "%s", "%s")',
 $nickname,
 $email,
 $phone,
 $type,
 $how,
 $others
);

$result = $conn->query($sql);
if (!$result){
 die($conn->error);
}

header('Location: index.php');


?>