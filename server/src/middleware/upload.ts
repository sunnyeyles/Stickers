import multer from 'multer'
import { envConfig } from '../config/env_config'

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, envConfig.imagePath)
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname)
    }
})

export const upload = multer({ storage: storage })