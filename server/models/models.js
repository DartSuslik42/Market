const sequelize = require("../db")
const {DataTypes} = require('sequelize')

const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Role = sequelize.define('role', {
    name: {type: DataTypes.STRING, allowNull: false},
})

const Storage = sequelize.define('users_blocks', {
    amount: {type: DataTypes.INTEGER, allowNull: false},
})

const Blocks = sequelize.define('blocks', {
    name: {type: DataTypes.STRING, primaryKey: true},
    id: {type: DataTypes.STRING, unique: true, allowNull: false},
    picture: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.FLOAT, defaultValue: 0}
})

const Basket_Blocks = sequelize.define('basket_blocks', {
    amount: {type: DataTypes.INTEGER, allowNull: false},
})

const Orders = sequelize.define('orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    amount: {type: DataTypes.INTEGER, allowNull: false},
    price: {type: DataTypes.FLOAT, allowNull: false},
    isSellOrder: {type: DataTypes.BOOLEAN, allowNull: false},
})

const Transactions = sequelize.define('transactions', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    amount: {type: DataTypes.INTEGER},
    price: {type: DataTypes.FLOAT},
    isOrder: {type: DataTypes.BOOLEAN, allowNull: false},
    isSellOrder: {type: DataTypes.BOOLEAN},
})

const Delivery = sequelize.define('delivery', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    cords: {type: DataTypes.STRING, allowNull: false},
    comment: {type: DataTypes.STRING},
    price: {type: DataTypes.FLOAT, allowNull: false},
    isStarted: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    isFinished: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    isToMarket: {type: DataTypes.BOOLEAN, allowNull: false},
    isAcceptedByOwner: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    isAcceptedByCarrier: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    isAcceptedByMarket: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
})

const Delivery_Blocks = sequelize.define('delivery_blocks', {
    amount: {type: DataTypes.INTEGER, allowNull: false},
})

//Role
Users.hasMany(Role)
Role.belongsTo(Users)

//Storage
Users.belongsToMany(Blocks, {through: Storage})
Blocks.belongsToMany(Users, {through: Storage})

//Orders
Users.belongsToMany(Blocks, {through: Orders})
Blocks.belongsToMany(Users, {through: Orders})

//Delivery
Users.hasMany(Delivery, {
    foreignKey: 'user_owner',
    as: 'delivery',
})
Delivery.belongsTo(Users, {
    foreignKey: 'user_owner',
    as: 'owner',
})
Users.hasMany(Delivery, {
    foreignKey: 'user_carrier',
    as: 'delivery_to_do',
})
Delivery.belongsTo(Users, {
    foreignKey: 'user_carrier',
    as: 'carrier',
})
Delivery.belongsToMany(Blocks, {through: Delivery_Blocks})
Blocks.belongsToMany(Delivery, {through: Delivery_Blocks})

//Transactions
Users.hasMany(Transactions, {
    foreignKey: 'user_sell',
    as: 'sold',
})
Transactions.belongsTo(Users, {
    foreignKey: 'user_sell',
    as: 'seller',
})
Users.hasMany(Transactions, {
    foreignKey: 'user_buy',
    as: 'bought',
})
Transactions.belongsTo(Users, {
    foreignKey: 'user_buy',
    as: 'buyer',
})

Blocks.hasMany(Transactions)
Transactions.belongsTo(Blocks)

//Basket
Users.hasOne(Basket)
Basket.belongsTo(Users)
Basket.belongsToMany(Blocks, {through: Basket_Blocks})
Blocks.belongsToMany(Basket, {through: Basket_Blocks})

module.exports = {
    Users,
    Basket,
    Role,
    Storage,
    Blocks,
    Basket_Blocks,
    Orders,
    Transactions,
    Delivery,
    Delivery_Blocks,
}