export type Config = {
  env: string
  port: number
  database: {
    host: string
    port: number
    username: string
    password: string
    database: string
  }
}

export function getConfig(): Config {
  // TODO: get from file (dev) or SSM (prod)
  return {
    env: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 3000,
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'postgres',
    }
  }
}
