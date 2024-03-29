<?php
require_once('conn.php');

$result = $conn->query('SELECT * FROM Dylan_Lazy_Events ORDER BY created_at ASC');
if (!$result) {
  die($conn->error);
}



?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lazy Admin</title>
    <link rel="shortcut icon" href="./images/webtab-icon.jpg" type="image/x-icon">
    <link rel="stylesheet" href="./style.css">

</head>

<body>
    <section class="admin-section">

      <h1>新拖延運動報名結果一覽</h1>

      <table>
        <tr>
          <th>#</th>
          <th>暱稱</th>
          <th>電子郵件</th>
          <th>手機號碼</th>
          <th>報名類型</th>
          <th>怎麼知道這個活動的？</th>
          <th>其他</th>
        </tr>       
        <?php while ($row = $result->fetch_assoc()) { ?>
        <tr>
          <td><?php echo $row['id']?></td>
          <td><?php echo $row['nickname']?></td>
          <td><?php echo $row['email']?></td>
          <td><?php echo $row['phone']?></td>
          <td><?php echo $row['type']?></td>
          <td><?php echo $row['how']?></td>
          <td><?php echo $row['others']?></td>
        </tr>
        <?php } ?>
    
      </table>

    </section>


    <footer>
        <p>© 2021 © Copyright. All rights Reserved.</p>
    </footer>



    <script>
        document.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault()

            // 抓取各項input值
            const nameData = document.querySelector('input[id=name]')
            const emailData = document.querySelector('input[id=email]')
            const phoneData = document.querySelector('input[id=phone-number]')
            const howData = document.querySelector('input[id=how]')
            const othersData = document.querySelector('input[id=sug]')

            // radio需設條件式判斷哪個被勾選
            const typeCheck = document.querySelectorAll('input[name=input-radio]')
            let typeData = ''
            for (let i = 0; i < typeCheck.length; i++) {
                if (typeCheck[i].checked) {
                    typeData = typeCheck[i]
                }
            }

            // // 檢測輸入框內是否有值並做出相應的反應
            // function isValid(value, positionClass) {
            //   if (value === '' || value === undefined) {
            //     document.querySelector(`.${positionClass}`).parentNode.classList.remove('hide')
            //   } else {
            //     document.querySelector(`.${positionClass}`).parentNode.classList.add('hide')
            //   }
            // }

            // 改進方法：無論 value 是空字串跟 value 是 undefined，在判斷式裡面都會被轉型成 false，所以可以直接做三元判斷
            function isValid(value, positionClass) {
                const parentElement = document.querySelector(`.${positionClass}`).parentNode
                value ? parentElement.classList.add('hide') : parentElement.classList.remove('hide')
            }

            isValid(nameData.value, 'notice-name')
            isValid(emailData.value, 'notice-email')
            isValid(phoneData.value, 'notice-phone')
            isValid(typeData.value, 'notice-type')
            isValid(howData.value, 'notice-how')

            if (nameData.value !== '' && emailData.value !== '' && phoneData.value !== '' && typeData.value !== undefined && howData.value !== '') {
                alert(`
       表單完成
       暱稱：${nameData.value}
       電子郵件：${emailData.value}
       電話：${phoneData.value}
       報名類型：${typeData.value}
       活動來源：${howData.value}
       其他建議：${othersData.value}
      `)
            }
        })


    </script>


</body>

</html>