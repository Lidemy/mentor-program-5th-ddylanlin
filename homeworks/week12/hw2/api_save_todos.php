<?php 
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');


  if (empty($_POST['todo'])) {
    $json = array(
      'ok' => false,
      'message' => 'Please input missing fields');
    
    $response = json_encode($json);
    echo $response;
    die();
  }


  $todo = $_POST['todo'];


  $stmt = $conn->prepare('INSERT INTO Dylan_todo(todo) VALUE (?)');
  $stmt->bind_param('s', $todo);
  $result = $stmt->execute();

  if (!$result) {
    $json = array(
      'ok' => false,
      'message' => $conn->error);
    
    $response = json_encode($json);
    echo $response;
    die();
  }

  $json = array(
    'ok' => true,
    'message' => 'Success',
    'id' => $conn->insert_id
    );
  
  $response = json_encode($json);
  echo $response;


  
  // if($_SERVER['REQUEST_METHOD'] == "POST"){
  //     $inputJson = file_get_contents('php://input');
  //   }else{
  //     $json = array(
  //       'ok' => false,
  //       'message' => 'MISSING');
  
  //     $response = json_encode($json);
  //     echo $response;
  //     die();
  //   }
   
  
  //   $result = json_decode($inputJson);
  //   // echo ($result->todos[0]->info->content);
  
    
  //   $site_key = $result->site_key;
  //   $id = $result->todos[0]->id;
  //   $content = $result->todos[0]->info->content;
  //   $checked = $result->todos[0]->info->checked;
  
  //   $stmt = $conn->prepare('INSERT INTO Dylan_todo(site_key, id, content, checked) VALUE (?, ?, ?, ?)');
  //   $stmt->bind_param('sisi', $site_key, $id, $content, $checked);
  //   $result = $stmt->execute(); 
  
?>
