#!/usr/bin/env node
import process from 'node:process'
import { gmv } from '../dist/index.js'

const l = process.argv.length
if (l < 4) {
  console.log('Usage: gmv GLOB DEST_PATTERN')
  process.exit(1)
}

gmv(process.argv.slice(2, l - 1), process.argv[l - 1])
console.log('All done')
