const db = require('../models')
const { hashPassword } = require('../midlleware/helpers')

const userTest = (req, res) => {
    try {
        res.status(200).json({ data: 'tafa @zay', message: 'ok ok nama' })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const create = async (req, res) => {
    try {
        var password = hashPassword(req.body.password)
        const user = await db.user.build({
            email: req.body.email,
            password: password,
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        })
        if (!req.body.email || !req.body.username || !req.body.password) {
            res.status(200).json({ message: 'error body required' })
        } else {
            await user.save()
            await user.reload()
            res.status(200).json({ data: user, message: 'success' })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const getAll = async (req, res) => {
    try {
        const user = await db.user.findAll()
        if (user.length !== 0) {
            res.status(200).json({ data: user, message: 'success' })
        } else {
            res.status(200).json({ message: 'user empty' })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const update = async (req, res) => {
    try {
        const user = await db.user.findByPk(req.params.id)
        if (user) {
            var password = hashPassword(req.body.password)
            await user.update({
                email: req.body.email,
                password: password,
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname
            })
            res.status(200).json({ data: user, message: 'success' })
        } else {
            res.status(200).json({ message: 'error id' })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const destroy = async (req, res) => {
    try {
        const user = await db.user.findByPk(req.params.id)
        if (user) {
            await user.destroy({ where: { id: req.params.id } })
            res.status(200).json({ message: 'success' })
        } else {
            res.status(200).json({ message: 'error id' })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

module.exports = {
    userTest,
    create,
    getAll,
    update,
    destroy
}