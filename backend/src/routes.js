//const { Router } = require('express')
import { Router } from 'express'
import User from './app/models/User'
import UserController from './app/controllers/UserController'
import LoginController from './app/controllers/LoginController'
import authMiddleware from './app/middlewares/auth'

const routes = new Router()

routes.get('/', (req, res) => {
    res.send('Welcome')
})

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)
routes.get('/users/:id', UserController.show)
routes.put('/users', UserController.update)
routes.post('/login', LoginController.store)
routes.delete('/users/:id', authMiddleware, UserController.delete)

/* usado anteriormente para teste */
//routes.get('/', async (req, res)=>{
    /* Está aqui só para testar, depois será removido*/
//    await User.create({
//        nome: 'José Coelho',
//        email: 'jose-coelho@gmail.com',
//        senha: '123456'
//    }//, function (err, user){
     //   if (err) return res.status(400).json({ error: "Erro: não cadastrado"})
     //   return res.status(200).json({ error: "Usuário Cadastrado"})
    //}
//    ).then(()=>{
//        return res.status(200).json({ error: "Usuário Cadastrado"})
//    }).catch(err=>{
//        return res.status(400).json({ error: "Erro: não cadastrado"})
//    })
//})

//module.exports = routes

export default routes