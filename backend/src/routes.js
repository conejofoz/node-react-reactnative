//const { Router } = require('express')
import { Router } from 'express'

const routes = new Router()

routes.get('/', (req, res)=>{
    res.send('Welcome to backend')
})

//module.exports = routes
export default routes