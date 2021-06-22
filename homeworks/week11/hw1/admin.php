<?php
require_once('conn.php');
require_once('utils.php');

$username = NULL;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $user = getUserFromUsername();
  if ($user['role'] !== 'admin'){
    print_r('You do not have permission,please leave');
  }
}

$stmt = $conn->prepare('SELECT * FROM Dylan_board_users');
$result = $stmt->execute();
if (!$result) {
  die('Error: ' . $conn->error);
}
$result = $stmt->get_result();
$row = $result->fetch_assoc();

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin</title>
    <link rel="stylesheet" href="style.css">

</head>

<body>
    <section class="admin-section">

      <div class="admin-title">
        <h1>Users List</h1>
        <a class="adminBack-btn"href="index.php">Back</a>
      </div>
     
      <?php 
      if (!empty($_GET['Code'])) { 
        $Code = $_GET['Code'];

        $msg = NULL;
        if ($Code == 1){
          $msg = 'Nothing Update';
        } else if ($Code == 2) {
          $msg = 'Update Successed';
        }
        echo '<h3>' . $msg . '</h3>' ;  
      }      
      ?>
      <table>
        <tr>
          <th>ID</th>
          <th>Role</th>
          <th>Nickname</th>
          <th>Username</th>
          <th>Created_time</th>
          <th>Modify</th>
        </tr>       

        <?php while($row = $result->fetch_assoc()) { ?>
        <form action="handle_admin_renew.php?id=<?php echo escape($row['id'])?>.php" method="POST">
        <tr>
          <td><?php echo escape($row['id'])?></td>

          <td> 
            <select name="role">
              <option value=""><?php echo escape($row['role'])?></option>
            　<option value="normal">normal</option>
            　<option value="suspend">suspend</option>
            　<option value="admin">admin</option>
            　<option value="editor">editor</option>
            </select>
          </td>

          <td><?php echo escape($row['nickname'])?></td>
          <td><?php echo escape($row['username'])?></td>
          <td><?php echo escape($row['created_at'])?></td>
          <td>  
           <button class="submit-btn update-nickname-btn" type="submit">Update</button>
          </td>
        </tr>

        </form>
        <?php } ?>
    
      </table>
      
    </section>
</body>

</html>