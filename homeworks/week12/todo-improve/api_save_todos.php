<?php 
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');


  if (empty($_POST['todo']) || empty($_POST['site_key']) ) {
    $json = array(
      'ok' => false,
      'message' => 'Please input missing fields');
    
    $response = json_encode($json);
    echo $response;
    die();
  }


  $todo = $_POST['todo'];
  $name = $_POST['site_key'];

  // 先進資料庫判斷是否存在name
  $stmt = $conn->prepare('SELECT * FROM Dylan_todo WHERE site_key=?');
  $stmt->bind_param('s', $name);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  
  if ($row) { //如果資料庫已存在就更新

    $stmtU = $conn->prepare('UPDATE Dylan_todo SET todo=? WHERE site_key=?');
    $stmtU->bind_param('ss', $todo ,$name);
    $resultU = $stmtU->execute();
  
    if (!$resultU) {
      $json = array(
        'ok' => false,
        'message' => $conn->error);
      
      $response = json_encode($json);
      echo $response;
      die();
    }
  
    $json = array(
      'ok' => true,
      'message' => 'Success update',
      'site_key' => $name,
      'status' => 'Updated list'
      );
    
    $response = json_encode($json);
    echo $response;

  } else { // 若查無資料則建立新的欄位

    $stmtI = $conn->prepare('INSERT INTO Dylan_todo(todo, site_key) VALUE (? ,?)');
    $stmtI->bind_param('ss', $todo ,$name);
    $resultI = $stmtI->execute();
  
    if (!$resultI) {
      $json = array(
        'ok' => false,
        'message' => $conn->error);
      
      $response = json_encode($json);
      echo $response;
      die();
    }
  
    $json = array(
      'ok' => true,
      'message' => 'Success create',
      'site_key' => $name,
      'status' => 'Created new list'
      );
    
    $response = json_encode($json);
    echo $response;
  

  }

  
?>
