import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import session from 'express-session' // Import session middleware here
import passport from './middleware/google_auth' // Import the Passport configuration
import { connectToDatabase } from './helper_functions/connect_to_db'
import router from './routes.ts/routes'
import {
  dropCollections,
  seedItems,
  seedUsers,
} from './helper_functions/seed_db'

const app: Express = express()
const port = process.env.PORT || 3001

connectToDatabase()
app.use(cors())
app.use(express.json())
// Initialize Passport.js
app.use(passport.initialize())

// Configure session middleware before Passport.session()
app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
  })
)
// Use Passport.session() after configuring session middleware
app.use(passport.session())

// Routes
app.use(router)

// START SERVER
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
