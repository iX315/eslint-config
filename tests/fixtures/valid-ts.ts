// Valid TypeScript code
// - Uses 'any' type (should be allowed since no-explicit-any is off)
// - Follows style rules

const data: any = { foo: 'bar' }

function processData(input: any): string {
  return input.toString()
}

interface User {
  name: string
  age: number
}

export { data, processData, User }
