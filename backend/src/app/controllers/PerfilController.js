import * as Yup from 'Yup'
import bcrypt from 'bcryptjs'
import User from '../models/User'

/* 
    Para editar o perfil o usuário precisa do id que está no token
    Para ter o id usuário precisa do token
    Para ter o token o usuário precisa estar logado, pois é no processo de login que o token é criado e nele tem o id
    Não adianta o usuário mandar o id pelo body ou pela url, vai ser usado esse que está na requisição
    Esse id é extraído do token no processo de autorização, ou seja no middleware auth.
    Por isso chamar o middleware auth na rota antes de manipular o perfil
*/

class PerfilController{
    async show (req, res){
        //usando o id que foi inserido na requisição la no middleware de autorização
        await User.findOne({_id:req.userId}, '_id nome email createdAt updatedAt')
        .then((user)=>{
            res.json({
                error: false,
                user: user
            })
        }).catch((error)=>{
            res.status(400).json({
                error:true,
                message: error.message
            })

        })
    }
}

export default new PerfilController()