import { argv } from 'node:process'
import { globby } from 'globby'

console.log(argv.length)

const paths = await globby(['*', '!cake'])

console.log(paths)
