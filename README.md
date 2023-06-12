# glob-operations (glops)

Library to perform operations on files and directories matched with glob patterns.

Also provides CLI tools: `gmv` for `mv`, and `gcp` for `cp` with glob patterns.

## Usage

```ts
op: (
  fn: (file: string, dest: string) => Promise<void>,
) => (globs: string[], destPattern: string) => Promise<void>
```

You can pass multiple glob patterns with `globs` which will be passed to [fast-glob](https://github.com/mrmlnc/fast-glob).

`destPattern` can contain the following placeholders:
- `{p}` for the path
- `{n}` for the file name without the extension
- `{e}` for the file extension including the `.`

`fn` will be called with each matched file path `file` and the destination path `dest` (with the above placeholders replaced to the actual values).

Example:
```ts
import fs from 'node:fs/promises'
import { op, gmv, gcp } from 'glops'

// mv files with glob
const myGmv = op(fs.rename) // This is exactly how gmv is implemented

// cp files with glob
const myGcp = op(fs.copyFile) // This is exactly how gcp is implemented

await gmv(['./dist/**/*.js'], '{p}{n}.cjs')

await gcp(['./dist/**/*.d.ts'], '{p}{n}.cts')
```

CLI example:
```sh
npm install -g glops
gmv ./dist/**/*.js {p}{n}.cjs
gcp ./dist/**/*.d.ts {p}{n}.cts
```

## License

[MIT License](./LICENSE)
