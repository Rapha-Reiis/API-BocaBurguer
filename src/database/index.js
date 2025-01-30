import { Sequelize } from 'sequelize' 
import mongoose from 'mongoose'
import configDatabase from '../config/database.js' 

import User from '../app/model/User.js' 
import Product from '../app/model/Product.js'
import Category from '../app/model/Category.js'

const models = [User, Product, Category]

class Database {
    constructor() {
        this.init()
        this.mongo()
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

    mongo(){
        this.mongoConnection = mongoose.connect('mongodb://localhost:27017/burguer')
    }
}

export default new Database()
