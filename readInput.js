import fs from 'fs'

export const readInput = (filePath) =>
  fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
