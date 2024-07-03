import { Request } from 'express'

export const createUrl = (req: Request) => {
  if (!req || !req.protocol || !req.get) {
    throw new Error(
      "Invalid request object: Missing 'protocol' or 'get' method."
    )
  }

  const origin = `${req.protocol}://${req.get('host')}`

  return new URL(req.originalUrl || req.url, origin)
}

export const createFetchRequest = (req: Request) => {
  console.log(req)
  if (!req || !req.on || !req.headers) {
    throw new Error("Invalid request object: Missing 'on' or 'headers' method.")
  }

  const url = createUrl(req)

  const controller = new AbortController()
  req.on('close', () => controller.abort())

  const headers = new Headers()

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value)
        }
      } else {
        headers.set(key, values)
      }
    }
  }

  const init: {
    method: string
    headers: Headers
    signal: AbortSignal
    body?: any
  } = {
    method: req.method,
    headers,
    signal: controller.signal,
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body
  }

  return new Request(url.href, init)
}
