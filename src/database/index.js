import { Sequelize } from 'sequelize' 
import configDatabase from '../config/database.js' 

import User from '../app/model/User.js' 
import Product from '../app/model/Product.js'
import Category from '../app/model/Category.js'

const models = [User, Product, Category]

class Database {
    constructor() {
        this.init()
    }

    init() {
        this.connection = new Sequelize(configDatabase) 

        models.forEach((model) => model.init(this.connection)) 

        models.forEach((model) => {
            if (model.associate) {
                model.associate(this.connection.models) 
            }
        })
    }
}

export default new Database()
