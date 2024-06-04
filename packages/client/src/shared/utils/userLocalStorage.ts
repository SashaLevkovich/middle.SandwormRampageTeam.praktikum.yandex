export const setLocalStorageUser = (data: User) => {
  localStorage.setItem('user', JSON.stringify(data))
}

export const userIsAuth = () => {
  return localStorage.getItem('user') !== null
}
