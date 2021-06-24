<?php
require_once('conn.php');
require_once('utils.php');


$username = NULL;
$user = NULL;
$user['role'] = NULL;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $user = getUserFromUsername();
}



// utils function
$result = sqlGet('SELECT 
AA.id AS id, AA.title AS title, 
AA.content AS content, AA.created_at AS created_at, 
UU.username AS username, UU.role AS role 
FROM Dylan_blog_articles AS AA 
LEFT JOIN Dylan_blog_users AS UU 
ON AA.username = UU.username 
WHERE AA.is_deleted=0 
ORDER BY AA.id DESC');
?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>W11 Blog</title>
</head>
<body>
  
  <header>
    <a class="logo" href="index.php">Blog</a>
    <nav>
      <a href="#">About</a>
      <a href="article_list.php">Articles</a>
      <a href="#">Category</a>
      <a href="#">Category</a>
      <a href="#">Category</a>
    </nav>
  </header>

  <!-- <img class="banner" src="https://picsum.photos/1920/500/?=2"> -->
  
  
  <section>
    <div class="admin-btn">
    <?php if (!$username) { ?>
      <a class="create-btn" href="login.php">Login</a>
      <?php } else { ?>
        <?php if ($user['role'] == 'admin') { ?>
          <a class="create-btn" href="create_article.php">New Post</a>
        <?php } ?>
      <a class="create-btn" href="handle_logout.php">Logout</a>
    <?php } ?>
    </div>
    

    <?php
    if (!empty($_GET['errCode'])) {
      $code = $_GET['errCode'];
      $msg = 'Error';

      if ($code === '1') {
        $msg = 'Incomplete Input';
      } else if ($code === '4') {
        $msg = "Honey~ you're not admin ; )";
      }
      echo '<h2>' . $msg . '</h2>';
    }
    ?>
    
    <div class="page">Recent</div>

    <?php while ($row = $result->fetch_assoc()) { ?>
      <a href="article.php?id=<?php echo escape($row['id']) ?>">
        <div class="card">
          <img class="card-img" src="https://picsum.photos/250/250/?random=1">
          <div class="card-info">
            <div class="card-title">我是標題我是標題我我是標我是標我是標我是標我是標是標題我是標題</div>
            <div class="card-time"><?php echo escape($row['created_at']) ?></div>
            <div class="card-category">
              <div><a class="category-btn" href="category1">category1</a></div>
              <div><a class="category-btn" href="category2">category2</a></div>
            </div>
            <div class="card-desc"><?php echo escape($row['content']) ?></div>
          </div>

          <?php if ($user['role'] === 'admin') { ?>
          <div class="card-admin-btn">
            <a class="delete-btn" href="edit_article.php?id=<?php echo escape($row['id']);?>">Edit</a>
            <a class="delete-btn" href="handle_delete_article.php?id=<?php echo escape($row['id']);?>">Delete</a>
          </div>
          <?php } ?>
        </div>
      </a>
      <?php } ?>

     

     <a class="more-btn" href="#">load more..</a>

  </section>

<footer>
  Copyright © 2020 B612
</footer>



</body>
</html>