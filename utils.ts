export function parseTen(n: string) {
  return parseInt(n, 10);
}

export function add(a: number, b: number) {
  return a + b;
}

export function multiply(a: number, b: number) { return a*b}

export function isUpcase(string: string) {
  return string.toUpperCase() === string
}

export function hasProperty(obj: Record<string, unknown>, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
