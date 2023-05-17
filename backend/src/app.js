//const express = require('express')
////const app = express()
//const routes = require('./routes')

import express from 'express'
import routes from './routes'
import './config/conexao' //não precisa colocar from porque o nome do arquivo é index.js
import bodyParser from 'body-parser'
import path from 'path'

class App{
    constructor(){
        this.app = express()
        this.middlewares()
        this.routes()
    }
    middlewares(){
        this.app.use(express.json())
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(
            '/files',
            express.static(path.resolve(__dirname, '..','tmp', 'uploads'))
        )
    }
    routes(){
        this.app.use(routes)
    }
}


//module.exports = new App().app
export default new App().app