import multer from 'multer'


// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../../../uploads/")
    },
    filename: (req, file, callback) => {
        callback(null,  Date.now() + '-' + file.originalname)
    }
})
  
export const upload = multer({storage: storage})