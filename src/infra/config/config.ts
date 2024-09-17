export type Config = {
  port: number;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  }
}

export function getConfig(): Config {
  return {
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
