export interface Jwt {
  sign: (payload: object | string | Buffer) => string
}
