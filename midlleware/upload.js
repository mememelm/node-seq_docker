const db = require('../models')
var multer = require('multer')
const path = require('path')
var fs = require('fs');
const { imageFilter } = require('../midlleware/helpers')

const convertDate = (date) => {
    let year = date.getFullYear()
    let montth = date.getMonth()
    let day = date.getDay()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    let seconde = date.getSeconds()
    return (year + '' + montth + '' + day + '-' + hour + '' + minutes + '' + seconde)
}

const upload = async (req, res) => {
    console.log(req.file)
    try {
        fs.readFile(req.file.path, (err, contents) => {
            if (err) {
                res.status(200).send({ message: err })
            } else {
                const name = req.file.originalname
                const url = config.baseUrl + req.file.originalname
                const format = req.file.mimetype
                const size = req.file.size
                res.status(200).send({ response: 'Uploads OK ', status: 200, url: url, body: req.body, file: req.file })
            }
        })
    } catch (error) {
        return res.status(400).send(error)
    }
}

// use multer for image-cloud
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, convertDate(new Date()) + path.extname(file.originalname))
    }
})

var uploadedFile = multer({ storage: storage })
const destination = (req, res, next) => {
    uploadedFile.single('data')
    next()
}

const uploadImage = (req, res) => {
    try {
        let file = multer({
            storage: storage,
            fileFilter: imageFilter
        }).single('data')

        file(req, res, (err) => {
            if (req.fileValidationError) {
                return res.send(req.fileValidationError)
            }
            else if (!req.file) {
                return res.send('Please select an image to upload')
            }
            else if (err instanceof multer.MulterError || err) {
                return res.send(err)
            }
            // Display uploaded image for user validation
            res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`)
        })
    } catch (error) {
        return res.send(error)
    }
}

module.exports = { upload, destination, uploadImage }