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
    <script src="https://cdn.ckeditor.com/4.7.3/full/ckeditor.js"></script>
    <form class="ed-form" method="POST" action="handle_edit_article.php">
      <textarea calss="textarea-title" name="title" id="" cols="10" rows="1"><?php echo escape($row['title'])?></textarea>
      <textarea name="content" id="" cols="10" rows="10"><?php echo $row['content']?></textarea>
      <script>CKEDITOR.replace("content");</script>
      <input type="hidden" name="id" value="<?php echo escape($row['id']) ?>" />

      <div>
        <select name="category">
          <option value=""><?php echo escape($row['category'])?></option>
        　<option value="Front-end">Front-end</option>
        　<option value="Back-end">Back-end</option>
        　<option value="Others">Others</option>
        </select>
        <div>
          <input class="submit-btn" type="submit" value="Update"></input>
          <a class="delete-btn" href="handle_delete_article.php?id=<?php echo escape($row['id']);?>">Delete</a>
        </div>
        
      </div>
      
    </form>

  </div>
</body>

</html>