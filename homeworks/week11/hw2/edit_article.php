<?php
require_once('conn.php');
require_once('utils.php');

$id = $_GET['id'];
$username = $_SESSION['username'];
$user = getUserFromUsername();
if ($user['role'] !== 'admin') {
  header('Location: index.php?errCode=4');
}

$result = sql('SELECT * FROM Dylan_blog_articles WHERE id=?',
'i', $id, NULL);
$row = $result->fetch_assoc();

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
      <div class="ed-title">Edit Article</div>
      <a class="ed-back-btn"href="index.php">Back</a>
    </div>

    <?php
    if (!empty($_GET['errCode'])) {
      $code = $_GET['errCode'];
      $msg = 'Error';

      if ($code === '1') {
        $msg = 'Incomplete Input';
      }
      echo '<h2>' . $msg . '</h2>';
    }
    ?>

    <form class="ed-form" method="POST" action="handle_edit_article.php">
      <textarea name="content" id="" cols="10" rows="10"><?php echo escape($row['content'])?></textarea>
      <input type="hidden" name="id" value="<?php echo escape($row['id']) ?>" />
      <div>
        <input class="submit-btn" type="submit" value="Update"></input>
        <a class="delete-btn" href="handle_delete_article.php?id=<?php echo escape($row['id']);?>">Delete</a>
      </div>
      
    </form>

  </div>
</body>

</html>