import { readInput } from '../../../readInput.js'

const defaultMap = readInput('./input.txt')

const expandedMap = expandMap(defaultMap)

let plotsSet = new Set()

const findNextRegionCharacter = (map) => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (!plotsSet.has(`${y},${x}`) && !['', '.'].includes(map[y][x])) {
        return { y, x, value: map[y][x] }
      }
    }
  }
  return null
}

let currentCharacter = findNextRegionCharacter(expandedMap)

let result = 0

while (currentCharacter !== null) {
  const { y, x, value } = currentCharacter
  let area = 0
  const newMap = JSON.parse(JSON.stringify(expandedMap))
  const bottomSets = new Set()
  const topSets = new Set()
  const leftSets = new Set()
  const rightSets = new Set()

  findClosePlot(y, x)

  function findClosePlot(y, x, direction) {
    if (y < 0 || y >= newMap.length || x < 0 || x >= newMap[y].length) {
      return
    }

    if (newMap[y][x] === value) {
      if (plotsSet.has(`${y},${x}`)) {
        return
      }

      area++
      plotsSet.add(`${y},${x}`)
      findClosePlot(y, x + 1, 'right')
      findClosePlot(y, x - 1, 'left')
      findClosePlot(y + 1, x, 'down')
      findClosePlot(y - 1, x, 'up')
    } else {
      let set =
        direction === 'down'
          ? bottomSets
          : direction === 'up'
            ? topSets
            : direction === 'left'
              ? leftSets
              : rightSets

      set.add(`${y},${x}`)
      newMap[y][x] = '.'
    }
  }

  const bottomSides = countSides(bottomSets, 'down')
  const topSides = countSides(topSets, 'up')
  const leftSides = countSides(leftSets, 'left')
  const rightSides = countSides(rightSets, 'right')

  result += area * (bottomSides + topSides + leftSides + rightSides)

  currentCharacter = findNextRegionCharacter(expandedMap)
}

console.log(result)

function countSides(originalSet, direction) {
  if (originalSet.size === 0) {
    return 0
  }

  if (originalSet.size === 1) {
    return 1
  }

  const tree = {}

  originalSet.forEach((side) => {
    const [y, x] = side.split(',').map(Number)
    const mainLeaf = direction === 'down' || direction === 'up' ? y : x
    const secondaryLeaf = direction === 'down' || direction === 'up' ? x : y
    if (tree[mainLeaf]) {
      tree[mainLeaf].push(secondaryLeaf)
    } else {
      tree[mainLeaf] = [secondaryLeaf]
    }
  })

  let counter = 0

  Object.keys(tree).forEach((key) => {
    const array = tree[key]
    array.sort((a, b) => a - b)
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i + 1] - array[i] !== 1) {
        counter++
      }
    }
    counter++
  })

  return counter
}

function expandMap(map) {
  const newMap = [Array(map[0].length + 2).fill('')]
  newMap.push(...map.map((line) => ['', ...line.split(''), '']))
  newMap.push(Array(map[0].length + 2).fill(''))
  return newMap
}
