/**
 * sessionStorage存储
 */
export const get = (k) => {
  try {
    let v = sessionStorage.getItem(k)
    if (v !== null) {
      return v
    }
  } catch(err) {}
}

export const set = (k, v) => {
  try {
    sessionStorage.setItem(k, v)
  } catch(err) {}
}

export const remove = (k) => {
  try {
    sessionStorage.removeItem(k)
  } catch(err) {}
}
