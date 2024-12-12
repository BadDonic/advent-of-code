import { readInput } from '../../../readInput'

const map = readInput('./input.txt')

let plotsSet = new Set()

const findNextRegionCharacter = () => {
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (!plotsSet.has(`${x},${y}`)) {
        return { x, y, value: map[x][y] }
      }
    }
  }
  return null
}

let currentCharacter = findNextRegionCharacter()

let result = 0

while (currentCharacter !== null) {
  const { x, y, value } = currentCharacter
  let area = 0
  let perimeter = 0
  findClosePlot(x, y)

  function findClosePlot(x, y) {
    if (x < 0 || x >= map.length || y < 0 || y >= map[x].length) {
      perimeter++
      return
    }

    if (map[x][y] === value) {
      if (plotsSet.has(`${x},${y}`)) {
        return
      }
      area++
      plotsSet.add(`${x},${y}`)
      findClosePlot(x + 1, y)
      findClosePlot(x - 1, y)
      findClosePlot(x, y + 1)
      findClosePlot(x, y - 1)
    } else {
      perimeter++
    }
  }
  console.log({ area, perimeter, value })

  result += area * perimeter

  currentCharacter = findNextRegionCharacter()
}

console.log(result)
