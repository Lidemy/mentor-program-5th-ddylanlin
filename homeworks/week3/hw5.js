/* eslint-disable no-unused-vars */
function solve(lines) {
  for (let i = 1; i < lines.length; i++) {
    const [a, b, c] = lines[i].split(' ')
    console.log(finalCompare(a, b, Number(c)))
  }
}

function finalCompare(a, b, c) {
  let result = ''

  switch (c) {
    case 1:
      result = (a.length === b.length) ? numberCompare(a, b, c) : a.length > b.length ? 'A' : 'B'
      break

    case -1:
      result = (a.length === b.length) ? numberCompare(a, b, c) : a.length > b.length ? 'B' : 'A'
      break
  }
  return result
}

function numberCompare(a, b, c) {
  if (a === b) return 'DRAW'
  let result = ''

  switch (c) {
    case 1:
      result = (a > b) ? 'A' : 'B'
      break

    case -1:
      result = (a > b) ? 'B' : 'A'
      break

    default:
      result = (a > b) ? 'A' : 'B'
  }
  return result
}
