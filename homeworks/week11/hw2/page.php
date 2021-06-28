<?php
require_once('conn.php');
require_once('utils.php');


if (empty( $_GET['page'])) {
  header('Location: page.php?page=list');
  exit;
} else {
  $page = $_GET['page'];
}



$username = NULL;
$user = NULL;
$user['role'] = NULL;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $user = getUserFromUsername();
}

switch ($page) {
  case 'List':
    $result = sqlGet('SELECT 
    AA.id AS id, AA.title AS title, AA.category As category, 
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

  case 'About':
    $result = sqlGet('SELECT * FROM Dylan_blog_articles');
  break;
  
  default:
    header('Location: page.php?page=List');
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
      <a id="nav1" href="page.php?page=About">About</a>
      <a id="nav2" href="page.php?page=List">Articles</a>
      <a id="nav3" href="page.php?page=Front-end">Front-end</a>
      <a id="nav4" href="page.php?page=Back-end">Back-end</a>
      <a id="nav5" href="page.php?page=Others">Others</a>
    </nav>
  </header>

  
  <section>
  
    <div class="list-block">

    <?php if ($user['role'] === 'admin') {?>
    <div class="admin-btn">
      <a class="create-btn" href="admin.php">Admin</a>
      <a class="create-btn" href="handle_logout.php">Logout</a>
    </div>
    <?php } ?>


      <div class="page"><?php echo escape($page); ?></div>

      <?php if ($page !== 'About') {?>

        <?php while ($row = $result->fetch_assoc()) { ?>
          <div class="list-card">

            <a class="" href="article.php?id=<?php echo escape($row['id'])?>">
              <div class="list-title"><?php echo escape($row['title']) ?></div>
            </a>
            <div class="list-right">
              <p class="list-time"><?php echo escape($row['created_at']) ?></p>

              <?php if ($user['role'] === 'admin') { ?>
              <div class="card-admin-btn list-admin-btn">
                <a class="delete-btn" href="edit_article.php?id=<?php echo escape($row['id']);?>">Edit</a>
                <a class="delete-btn" href="handle_delete_article.php?id=<?php echo escape($row['id']);?>">Delete</a>
              </div>
              <?php } ?>
            </div>

            </div>
        <?php } ?>

      

      <?php } else { ?>
        <div class="about-card">
          <img src="Mr._Meeseeks.png" alt="">
          <div class=" about-info">
            <h1>Mr. Meeseeks</h1>
            <p>Mr. Meeseeks is a recurring fictional species in the American  animated television series Rick and Morty. 

            Mr. Meeseeks  is the name of all the Meeseeks summoned by activating a Mr. Meeseeks Box. The Meeseeks appear in the fifth episode of the first season, "Meeseeks and Destroy" as the main antagonists. They are known to inhabit planets across the universe.</p>
            <div class=" link">
              <a href="https://www.facebook.com/themrmeeseeks"><img class="link-btn" src="https://image.flaticon.com/icons/png/512/733/733547.png" alt="facebook-icon"></a>
              <a class="link-btn" href="https://www.instagram.com/explore/tags/mrmeeseeks"><img class="link-btn" src="https://image.flaticon.com/icons/png/512/2111/2111463.png" alt="instagram-icon-icon"></a>
              <a class="link-btn" href="https://youtu.be/LHuAFTyXP8Y"><img class="link-btn" src="https://image.flaticon.com/icons/png/512/174/174883.png" alt="youtube-icon"></a>
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


<script> 

  const page = '<?php echo $_GET['page']?>'

  switch (page) {
    case 'About':
      document.querySelector('#nav1').classList.add('nav-color')
    break;
    case 'List':
      document.querySelector('#nav2').classList.add('nav-color')
    break;
  
    case 'Front-end':
      document.querySelector('#nav3').classList.add('nav-color')
    break;

    case 'Back-end':
      document.querySelector('#nav4').classList.add('nav-color')
    break;

    case 'Others':
      document.querySelector('#nav5').classList.add('nav-color')
    break;

  }


</script>


</html>