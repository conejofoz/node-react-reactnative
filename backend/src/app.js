//const express = require('express')
////const app = express()
//const routes = require('./routes')

import express from 'express'
import routes from './routes'
import './database' //não precisa colocar from porque o nome do arquivo é index.js

class App{
    constructor(){
        this.app = express()
        this.routes()
        this.middlewares()
    }
    middlewares(){
        this.app.use(express.json())
    }
    routes(){
        this.app.use(routes)
    }
}


//module.exports = new App().app
export default new App().app