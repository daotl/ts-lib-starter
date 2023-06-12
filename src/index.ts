import fs from 'node:fs/promises'
import fg from 'fast-glob'

// run any operation on files and directories matched with glob patterns.
export const op = (fn: (file: string, dest: string) => Promise<void>) =>
  async function (globs: string[], destPattern: string) {
    const files = await fg(globs)
    files.forEach(async (s) => {
      const ip = s.lastIndexOf('/')
      const [path, nameExt] =
        ip < 0 ? ['', s] : [s.slice(0, ip + 1), s.slice(ip + 1)]
      const ie = nameExt.lastIndexOf('.')
      const [name, ext] = (
        ie < 0 ? [nameExt, ''] : [nameExt.slice(0, ie), nameExt.slice(ie)]
      ) as [string, string]
      const dest = destPattern
        .replace('{f}', s)
        .replace('{p}', path)
        .replace('{n}', name)
        .replace('{e}', ext)

      try {
        await fn(s, dest)
        console.error(`mv '${s}' to '${dest}'`)
      } catch (e) {
        console.error(`Failed to mv '${s}' to '${dest}': ${e}`)
      }
    })
  }

// mv files and directories matched with glob patterns.
export const gmv = op(fs.rename)

// cp files and directories matched with glob patterns.
export const gcp = op(fs.copyFile)
