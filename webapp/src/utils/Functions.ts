export function titleCase(val: string) {
  return val.replace(/\b\w/g, (char) => char.toUpperCase());
}
