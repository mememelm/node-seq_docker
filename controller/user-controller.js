const userTest = (req, res) => {
    try {
        res.status(200).json({ data: 'data REST', message: 'success' })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

module.exports = { userTest }