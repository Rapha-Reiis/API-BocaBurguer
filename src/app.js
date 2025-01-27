import express from "express";
import routes from './routes.js'
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import './database/index.js'

class App{

    constructor(){
        this.app = express()
        this.midlewares()
        this.routes()
    }

    midlewares(){
        this.app.use(express.json())
        this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads')))
    }

    routes(){
        this.app.use(routes)
    }
}


export default new App().app