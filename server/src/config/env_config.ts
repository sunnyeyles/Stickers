import dotenv from 'dotenv'

dotenv.config()

export const envConfig = {
  jwtSecret: process.env.JWT_SECRET,
  jwtAccessExpiration: '10s',
  jwtRefreshExpiration: '1d',
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
}
