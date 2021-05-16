'use strict'

const user = (sequelize, DataType) => {
    return sequelize.define('users', {
        email: DataType.STRING,
        password: DataType.STRING,
        username: DataType.STRING,
        firstname: DataType.STRING,
        lastname: DataType.STRING
    }, { freezeTableName: true })
}

module.exports = { user }