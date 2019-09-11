export const getId = obj => {
  let keys = Object.keys(obj)
  return keys[keys.length - 1] + 1
}