function switchNav(page) {
  switch (page) {
    case 'About':
      document.querySelector('#nav1').classList.add('nav-color')
      break

    case 'List':
      document.querySelector('#nav2').classList.add('nav-color')
      break

    case 'Front-end':
      document.querySelector('#nav3').classList.add('nav-color')
      break

    case 'Back-end':
      document.querySelector('#nav4').classList.add('nav-color')
      break

    case 'Others':
      document.querySelector('#nav5').classList.add('nav-color')
      break
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('.page').innerHTML
  switchNav(page)
})
