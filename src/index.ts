import process from 'node:process'
import fs from 'node:fs/promises'
import fg from 'fast-glob'

// run any operation on files and directories matched with glob patterns.
export const op = (fn: (file: string, dest: string) => Promise<void>) =>
  async function (globs: string[], destPattern: string) {
    const files = await fg(globs)
    files.forEach(async (file) => {
      const ip = file.lastIndexOf('/')
      const [path, nameExt] =
        ip < 0 ? ['', file] : [file.slice(0, ip + 1), file.slice(ip + 1)]
      const ie = nameExt.lastIndexOf('.')
      const [name, ext] = (
        ie < 0 ? [nameExt, ''] : [nameExt.slice(0, ie), nameExt.slice(ie)]
      ) as [string, string]
      const dest = destPattern
        .replace('{f}', file)
        .replace('{p}', path)
        .replace('{n}', name)
        .replace('{e}', ext)

      try {
        await fn(file, dest)
      } catch (e) {
        console.error(
          `Unhandled error when operating on '${file}', dest: '${dest}': ${e}`,
        )
        process.exit(1)
      }
    })
  }

// mv files and directories matched with glob patterns.
export const gmv = op(async (file: string, dest: string) => {
  try {
    await fs.rename(file, dest)
    console.error(`mv '${file}' to '${dest}'`)
  } catch (e) {
    console.error(`Failed to mv '${file}' to '${dest}': ${e}`)
  }
})

// cp files and directories matched with glob patterns.
export const gcp = op(async (file: string, dest: string) => {
  try {
    await fs.copyFile(file, dest)
    console.error(`cp '${file}' to '${dest}'`)
  } catch (e) {
    console.error(`Failed to cp '${file}' to '${dest}': ${e}`)
  }
})
