import dotenv from 'dotenv'
// importing mongoose here makes mongoose available globally
import mongoose from 'mongoose'
dotenv.config()

export const connectToDatabase = async () => {
  try {
    const dbUsername = process.env.DB_USERNAME
    const dbPassword = process.env.DB_PASSWORD
    await mongoose.connect(
      // `mongodb+srv://${dbUsername}:${dbPassword}@ecommerce.1rapvds.mongodb.net/?retryWrites=true&w=majority`,
      `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.lexrc0z.mongodb.net/`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions
    )
    console.log('database connected')
  } catch (error) {
    console.error('Something went wronnngggg!:', error)
  }
}
