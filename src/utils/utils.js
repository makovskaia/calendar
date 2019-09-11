export const getId = obj => {
  let keys = Object.keys(obj)
  return +keys[keys.length - 1] + 1 || '0'
}

export const validateEvent = e => e.notes && e.notes.length <= 30 && e.title && e.title.length /* && smth abt availability*/