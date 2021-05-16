const errorParsor = (err, req, res, next) => {
    next(err)
    if (err) {
        const status = err.status ? err.status : 400
        const errorMessage = {
            error: 'error',
            message: err.message
        }

        if (err.errors) {
            const errors = err.errors.map(err => err.message)
            errorMessage['errors'] = errors
        }

        return res.status(status).send(errorMessage)
    } else {
        return next(err)
    }
}

module.exports = { errorParsor }