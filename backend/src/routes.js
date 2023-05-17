//const { Router } = require('express')
import { Router } from 'express'
import multer from 'multer'
import multerUpImgUsers from './app/middlewares/uploadImgUser'
import User from './app/models/User'
import UserController from './app/controllers/UserController'
import LoginController from './app/controllers/LoginController'
import PerfilController from './app/controllers/PerfilController'
import PerfilImagemController from './app/controllers/PerfilImagemController'
import authMiddleware from './app/middlewares/auth'

const routes = new Router()
const uploadImgUser = multer(multerUpImgUsers)

routes.get('/', (req, res) => {
    res.send('Welcome')
})

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)
routes.get('/users/:id', UserController.show)
routes.put('/users', UserController.update)
routes.post('/login', LoginController.store)

routes.get('/perfil', authMiddleware, PerfilController.show)
routes.put('/perfil', authMiddleware, PerfilController.update)
routes.put('/perfil-img', authMiddleware, uploadImgUser.single('file'), PerfilImagemController.update)
routes.delete('/users/:id', authMiddleware, UserController.delete)

export default routes