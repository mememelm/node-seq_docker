const db = require('../models/')

const userTest = (req, res) => {
    try {
        res.status(200).json({ data: 'data REST', message: 'success' })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const create = async (req, res) => {
    try {
        const user = await db.user.build(req.body)
        if (user) {
            
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

module.exports = { 
    userTest, 
    create 
}