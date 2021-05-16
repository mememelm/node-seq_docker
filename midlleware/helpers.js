// image filter
const imageFilter = (req, file, cb) => {
    try {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!'
            return cb(new Error('Only image files are allowed!'), false)
        }
        cb(null, true)
    } catch (error) {
        console.log('ERROR IMAGE FILTER', error)
    }
}

module.exports = { imageFilter }