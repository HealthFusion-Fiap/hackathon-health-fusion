export type Request = {
  body?: Record<string, any>
  params?: Record<string, any>
  query?: Record<string, any>
  headers?: Record<string, any>
  // authInfo?: AuthInfo
}

export type Response = {
  code: number
  body: unknown
}

export abstract class Controller {
  execute: (input: Request) => Promise<Response>;
}
