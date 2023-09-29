import dotenv from 'dotenv'

dotenv.config()

export const envConfig = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: '1h',
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
}
