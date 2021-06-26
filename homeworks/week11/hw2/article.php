<?php
require_once('conn.php');
require_once('utils.php');


if (empty($_GET['id']) || $_GET['id'] == NULL) {
  header('Location: index.php');
  exit;
}

$id = $_GET['id'];

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

  
  <section>
    <div class="article">
      <div class="atc-title"><?php echo escape($row['title']) ?></div>
      <div class="atc-category">
        <div><a class="category-btn" href="category1"><?php echo escape($row['category']) ?></a></div>
      </div>
      <div class="card-time"><?php echo escape($row['created_at']) ?></div>
      <div class="atc-content"><?php echo $row['content'] ?></div>
    </div>
  </section>

<footer>
  Copyright © 2020 B612
</footer>



</body>
</html>