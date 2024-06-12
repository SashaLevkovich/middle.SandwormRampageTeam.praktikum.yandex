export const setLocalStorageUser = (data: User) => {
  localStorage.setItem('user', JSON.stringify(data))
}

export const userIsAuth = () => {
  const user = localStorage.getItem('user')

  return user
}
