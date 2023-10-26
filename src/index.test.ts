import { hello } from './index.js'

// biome-ignore lint/correctness/noUndeclaredVariables:
test("hello('Nex') to equal 'Hello Nex!'", () => {
  // biome-ignore lint/correctness/noUndeclaredVariables:
  expect(hello('Nex')).toBe('Hello Nex!')
})
