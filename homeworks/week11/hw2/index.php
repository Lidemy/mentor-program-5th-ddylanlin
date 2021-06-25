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


$page = 1;
if (!empty($_GET['page'])) {
  $page = $_GET['page'];
}
$items_per_page = 5;
$offset = ($page-1) * $items_per_page;


// utils function
$result = sql('SELECT 
AA.id AS id, AA.title AS title, AA.category AS category, 
AA.content AS content, AA.created_at AS created_at, 
UU.username AS username, UU.role AS role 
FROM Dylan_blog_articles AS AA 
LEFT JOIN Dylan_blog_users AS UU 
ON AA.username = UU.username 
WHERE AA.is_deleted=0 
ORDER BY AA.id DESC 
LIMIT ? OFFSET ?',
'ii',$items_per_page, $offset);

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
      <a href="page.php?page=About">About</a>
      <a href="page.php?page=List">Articles</a>
      <a href="page.php?page=Front-end">Front-end</a>
      <a href="page.php?page=Back-end">Back-end</a>
      <a href="page.php?page=Others">Others</a>
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
            <div class="card-title"><?php echo escape($row['title']) ?></div>
            <div class="card-time"><?php echo escape($row['created_at']) ?></div>
            <div class="card-category">
              <div><a class="category-btn" href="page.php?page=<?php echo escape($row['category'])?>"><?php echo escape($row['category'])?></a></div>
            </div>
            <div class="card-desc"><?php echo $row['content'] ?></div>
          </div>

          
          <div class="card-admin-btn">
            <a class="delete-btn" href="article.php?id=<?php echo escape($row['id']);?>">Read</a>
            <?php if ($user['role'] === 'admin') { ?>
            <a class="delete-btn" href="edit_article.php?id=<?php echo escape($row['id']);?>">Edit</a>
            <a class="delete-btn" href="handle_delete_article.php?id=<?php echo escape($row['id']);?>">Delete</a>
            <?php } ?>
          </div>
        </div>
      </a>
      <?php } ?>

     
      <hr size="0.1rem" align="center" width="100%">

    
      <?php 

        $result = sqlGet('SELECT count(id) AS count FROM Dylan_blog_articles WHERE is_deleted=0');
        $row = $result->fetch_assoc();
        $count = $row['count'];
        $total_page = ceil($count / $items_per_page);
      ?>

      <div class="page-info">
        <span>Total <span style="color:green;font-size:1.2rem;"><?php echo $count ?></span> articles，Page </span>
        <span style="color:green;font-size:1.2rem;"><?php echo $page ?></span><span> / <?php echo $total_page?></span>
      </div>
      <div class="paginator">
        <?php if ($page != 1) { ?>
          <a href="index.php?page=1">Home</a>
          <a href="index.php?page=<?php echo $page - 1?>">Previous</a>
        <?php } ?>
        <?php if ($page != $total_page) { ?>
          <a href="index.php?page=<?php echo $page + 1?>">Next</a>
          <a href="index.php?page=<?php echo $total_page?>">End</a>
        <?php } ?>
      </div>
     



  </section>

<footer>
  Copyright © 2020 B612
</footer>



</body>
</html>