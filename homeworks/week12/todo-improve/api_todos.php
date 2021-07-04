<?php 
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  
  if (empty($_GET['site_key'])) {
    $json = array(
      'ok' => false,
      'message' => 'Please add site_key in URL');
    
    $response = json_encode($json);
    echo $response;
    die();
  }

  $name = ($_GET['site_key']);

  $stmt = $conn->prepare("SELECT * FROM Dylan_todo WHERE site_key = ?");
  $stmt->bind_param('s', $name);
  $result = $stmt->execute();

  if (!$result) {
    $json = array(
      'ok' => false,
      'message' => $conn->error);
    
    $response = json_encode($json);
    echo $response;
    die();
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $json = array(
    'ok' => true,
    'data' => array(
      'site_key' => $row['site_key'],
      'todo' => $row['todo'],
      'row' => $row
    ));

  
  $response = json_encode($json);
  echo $response;
?>