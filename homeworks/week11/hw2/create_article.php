<?php
require_once('conn.php');
require_once('utils.php');

$username = $_SESSION['username'];
$user = getUserFromUsername();
if ($user['role'] !== 'admin') {
  header('Location: index.php?errCode=4');
}

?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>W11Edit</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>


  
  
  <div class="panel">
   

    
    <div class="panel-top">
      <div class="ed-title">Create Article</div>
      <a class="ed-back-btn"href="index.php">Back</a>
    </div>

    <?php
    if (!empty($_GET['errCode'])) {
      $code = $_GET['errCode'];
      $msg = 'Error';

      if ($code === '1') {
        $msg = 'Incomplete Input';
      } else if ($code === '4') {
        $msg = "Honey~ don't try to hack admin ; )";
      }
      echo '<h2>' . $msg . '</h2>';
    }
    ?>
    
    <form class="ed-form" method="POST" action="handle_create_article.php">
      <textarea name="content" id="" cols="10" rows="10"></textarea>
      <div>
        <input class="submit-btn" type="submit" value="Post"></input>
      </div>
      
    </form>

  </div>
</body>

</html>