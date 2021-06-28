<?php
require_once('conn.php');
require_once('utils.php');


$username = $_SESSION['username'];
$user = getUserFromUsername();
if (!($_GET)) {
  header('Location: admin.php?page=All');
  exit;
} else if ($user['role'] !== 'admin') {
  header('Location: index.php?errCode=4');
  exit;
}



if (!empty($_GET['page'])) {
  $page = $_GET['page'];
} else {
  header('Location: index.php?errCode=4');
  exit;
}


switch ($page) {
  case 'All':
    $result = sqlGet('SELECT 
    AA.id AS id, AA.title AS title, 
    AA.content AS content, AA.created_at AS created_at 
    FROM Dylan_blog_articles AS AA 
    WHERE AA.is_deleted=0 
    ORDER BY AA.id DESC');
  break;
  
  case 'Front-end':
    $result = sqlGet('SELECT * FROM Dylan_blog_articles WHERE category="Front-end" AND is_deleted=0 ORDER BY id DESC');
  break;

  case 'Back-end':
    $result = sqlGet('SELECT * FROM Dylan_blog_articles WHERE category="Back-end" AND is_deleted=0 ORDER BY id DESC');
  break;

  case 'Others':
    $result = sqlGet('SELECT * FROM Dylan_blog_articles WHERE category="Others" AND is_deleted=0 ORDER BY id DESC');
  break;

  case 'Bin':
    $result = sqlGet('SELECT * FROM Dylan_blog_articles WHERE is_deleted=1 ORDER BY id DESC');
  break;
  
  default:
    header('Location: admin.php?page=All');
  break;
}
 


?>



<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>W11Page</title>
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
    <div class="list-block">
    
    <div class="admin-btn">
      <a class="create-btn" href="create_article.php">New Post</a>
      <a class="create-btn" href="handle_logout.php">Logout</a>
    </div>


    <form action="handle_admin_switch.php" method="GET">
      <select class="admin-select"name="page" onchange="submit();"> 
        <option value="List"><?php echo escape($page)?></option> 
        <option value="All">All</option>
        <option value="Front-end">Front-end</option>
      　<option value="Back-end">Back-end</option>
      　<option value="Others">Others</option>
        <option value="Bin">Bin</option>
      </select> 
    </form>


      <div class="page">Admin</div>

        <?php while ($row = $result->fetch_assoc()) { ?>
           

          <div class="list-card">

            <a class="" href="article.php?id=<?php echo escape($row['id'])?>">
              <div class="list-title"><?php echo escape($row['title']) ?></div>
            </a>
            <div class="list-right">
              <p class="list-time"><?php echo escape($row['created_at']) ?></p>

              <div class="card-admin-btn list-admin-btn">

                <?php if ($page !== 'Bin') {?>
                  <a class="delete-btn" href="edit_article.php?id=<?php echo escape($row['id']);?>">Edit</a>
                  <a class="delete-btn" href="handle_delete_article.php?id=<?php echo escape($row['id']);?>">Delete</a>
                <?php } else { ?>
                  <a class="delete-btn" href="handle_recover_article.php?id=<?php echo escape($row['id']);?>">Recover</a>
                <?php } ?>


              </div>
            </div>
            
          </div>

        
        <?php } ?>

          
        

    </div>
  </section>

<footer>
  Copyright © 2020 B612
</footer>

</body>


</html>