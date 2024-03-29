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
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lazy Form</title>
  <link rel="shortcut icon" href="./images/webtab-icon.jpg" type="image/x-icon">
  <link rel="stylesheet" href="./style.css">

</head>

<body>
  <section class="form-section">

    <h1>新拖延運動報名表單</h1>
    <div class="description">
      <p>活動日期：2021/05/20~2021/05/21</p>
      <p>活動地點：台北市大安區新生南路二段1號</p>
    </div>
    <div class="must-fill">*必填</div>

    <form calss="submit-form" method="POST" action="handle_submit.php">

      <div class="section-input hide">
        <label class="input-title" for="name">暱稱 <span class='star'>*</span></label>
        <input type="text" id="name" name="nickname" placeholder="你速隨">
        <p class="notice notice-name">請務必輸入暱稱</p>
      </div>

      <div class="section-input hide">
        <label class="input-title" for="enail">電子郵件 <span class='star'>*</span></label>
        <input type="email" id="email" name="email" placeholder="伊媚兒">
        <p class="notice notice-email">看不懂中文？ *代表必填</p>
      </div>

      <div class="section-input hide">
        <label class="input-title" for="phone-number">電話號碼 <span class='star'>*</span></label>
        <input type="number" id="phone-number" name="phone" placeholder="給虧嗎">
        <p class="notice notice-phone">不留電話怎麼情話纏綿</p>
      </div>

      <div class="section-input hide">
        <div class="input-title radio-hide">報名類型 <span class='star'>*</span></label>
          <div>
            <input class="input-radio" type="radio" name="type" id="imag" value="躺在床上用想像力實作">
            <label for="imag">躺在床上用想像力實作</label>
          </div>

          <div>
            <input class="input-radio" type="radio" name="type" id="twc" value="趴在地上滑手機找現成的">
            <label for="twc">趴在地上滑手機找現成的</label>
          </div>
          <p class="notice notice-type">是不會勾選膩</p>
        </div>
      </div>

      <div class="section-input hide">
        <label class="input-title" for="how">怎麼知道活動？ <span class='star'>*</span></label>
        <input type="text" id="how" name="how" placeholder="從實招來">
        <p class="notice notice-how">拜託配合一下啦~</p>
      </div>


      <div class="section-input">
        <label class="input-title" for="sug">其他</label>
        <div class="Other-text">
          <p>對活動的一些建議</p>
        </div>
        <input type="text" id="sug" name="others" placeholder="????">
      </div>

      <input class="sub-btn" type="submit" value="提交"></input>

    </form>
  </section>
  <footer>
    <p>© 2021 © Copyright. All rights Reserved.</p>
  </footer>



  <script>
    document.querySelector('form').addEventListener('submit', (e) => {



      // 抓取各項input值
      const nameData = document.querySelector('input[id=name]')
      const emailData = document.querySelector('input[id=email]')
      const phoneData = document.querySelector('input[id=phone-number]')
      const howData = document.querySelector('input[id=how]')
      const othersData = document.querySelector('input[id=sug]')

      // radio需設條件式判斷哪個被勾選
      const typeCheck = document.querySelectorAll('input[name=type]')
      let typeData = ''
      for (let i = 0; i < typeCheck.length; i++) {
        if (typeCheck[i].checked) {
          typeData = typeCheck[i]
        }
      }

      if (nameData.value === '' || emailData.value === '' || phoneData.value === '' || typeData.value === undefined || howData.value === '') {
        e.preventDefault()

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
        isValid(typeData.value, 'radio-hide')
        isValid(howData.value, 'notice-how')

        console.log(typeData.value)

      }

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