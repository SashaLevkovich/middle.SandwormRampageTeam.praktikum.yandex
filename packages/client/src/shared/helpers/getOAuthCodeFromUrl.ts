export const getOAuthCodeFromUrl = (url: string) => {
  const data: Record<string, string> = {}
  const oAuthParamsStringsArr = url.slice(1).split('&')

  oAuthParamsStringsArr.forEach(item => {
    const [name, value] = item.split('=')
    data[name] = value
  })

  return data['code']
}
