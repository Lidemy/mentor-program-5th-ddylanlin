<?php
require_once('conn.php');
require_once('utils.php');


if (empty( $_GET['page'])) {
  header('Location: page.php?page=list');
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
    AA.id AS id, AA.title AS title, 
    AA.content AS content, AA.created_at AS created_at, 
    UU.username AS username, UU.role AS role 
    FROM Dylan_blog_articles AS AA 
    LEFT JOIN Dylan_blog_users AS UU 
    ON AA.username = UU.username 
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
      <a href="page.php?page=About">About</a>
      <a href="page.php?page=List">Articles</a>
      <a href="page.php?page=Front-end">Front-end</a>
      <a href="page.php?page=Back-end">Back-end</a>
      <a href="page.php?page=Others">Others</a>
    </nav>
  </header>

  
  <section>
  
    <div class="list-block">


      

      <div class="page"><?php echo escape($page); ?></div>

      <?php if ($page !== 'About') {?>

        <?php while ($row = $result->fetch_assoc()) { ?>
          <a href="article.php?id=<?php echo escape($row['id'])?>">
            <div class=" list-title"><?php echo escape($row['title']) ?><p><?php echo escape($row['created_at']) ?></p></div>
          </a>
        <?php } ?>

        <a id="more-btn" href="#">load more..</a>

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

const loadmore = document.querySelector('#more-btn');
    let currentItems = 2;
    loadmore.addEventListener('click', (e) => {
      const elementList = [...document.querySelectorAll('.page .list-title')];
        for (let i = currentItems; i < currentItems + 2; i++) {
            if (elementList[i]) {
                elementList[i].style.display = 'block';
            }
        }
        currentItems += 2;

        // Load more button will be hidden after list fully loaded
        if (currentItems >= elementList.length) {
            event.target.style.display = 'none';
        }
    })

</script>

</html>