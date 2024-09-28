export interface Jwt {
  sign: (payload: object | string | Buffer) => string
  login: (token: string) => string | null
}
