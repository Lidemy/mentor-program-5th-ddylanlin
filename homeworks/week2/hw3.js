
function reverse(str){

  var temp = ''
  for(let i = str.length -1  ; i >= 0  ;i--){
    temp += str[i]
  }

  console.log(temp)

}

reverse('帥好我')
reverse('yoyoyo')
reverse('1abc2')
reverse('1,2,3,2,1')
