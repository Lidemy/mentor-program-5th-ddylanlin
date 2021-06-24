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
  <title>W11 List</title>
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

  
  <section>
    <div class="list-block">
      <div class="page">Article List</div>
      <?php while ($row = $result->fetch_assoc()) { ?>
        <a href="article.php?id=<?php echo escape($row['id'])?>">
          <div class="list-title"><?php echo escape($row['title']) ?></div>
        </a>
      <?php } ?>
    </div>
  </section>

<footer>
  Copyright © 2020 B612
</footer>



</body>
</html>