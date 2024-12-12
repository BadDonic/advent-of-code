const fs = require('fs')

export const readInput = (filePath) =>
  fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .map((line) => line.trim())
