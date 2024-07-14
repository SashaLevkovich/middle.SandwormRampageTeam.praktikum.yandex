export const setLocalStorageUser = (data: User | null) => {
  localStorage.setItem('user', JSON.stringify(data))
}

export const deleteLocalStorageUser = () => {
  localStorage.removeItem('user')
}

export const userIsAuth = () => {
  return localStorage.getItem('user') !== null
}
