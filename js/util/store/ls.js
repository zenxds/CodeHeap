/**
 * localStorage存储
 */
export const get = (k) => {
  try {
    let v = localStorage.getItem(k)
    if (v !== null) {
      return v
    }
  } catch(err) {}
}

export const set = (k, v) => {
  try {
    localStorage.setItem(k, v)
  } catch(err) {}
}

export const remove = (k) => {
  try {
    localStorage.removeItem(k)
  } catch(err) {}
}
