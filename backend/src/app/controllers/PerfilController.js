import * as Yup from 'Yup'
import bcrypt from 'bcryptjs'
import User from '../models/User'
import config from '../../config/config'

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
        await User.findOne({_id:req.userId}, '_id nome email createdAt updatedAt fileName')
        .then((user)=>{
            let url = config.url + '/files/users/' + user.fileName
            res.json({
                error: false,
                user: user,
                url: url
            })
        }).catch((error)=>{
            res.status(400).json({
                error:true,
                message: error.message
            })

        })
    }

    async update(req, res){

        const { email } = req.body

        const shema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().required(),
            senha: Yup.string().required().min(6)
        })
        if (!(await shema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 125,
                message: 'Error: Dados inválidos!'
            })
        }

        //const userExiste = await User.findOne({_id: req.body.id})
        const userExiste = await User.findOne({_id: req.userId})
        if (!userExiste) {
            return res.status(404).json({
                error: true,
                code: 126,
                message: `Error: Usuário não encontrado!`
            })
        }
        
        if(email !== userExiste.email) {
            const emailExiste = await User.findOne({email})
            if(emailExiste) {
                return res.status(400).json({
                    error: true,
                    code: 127,
                    message: `Esse email já está cadastrado com outro usuário`
                })
            }
        }

        let dadosFormulario = req.body

        if(dadosFormulario.senha){
            dadosFormulario.senha = await bcrypt.hash(dadosFormulario.senha, 8)
        }

        await User.updateOne({_id: req.userId}, dadosFormulario)
        .then(()=>{
            return res.json({
                error: false,
                message: `Usuário alterado com sucesso!`
            })
        }).catch(err=>{
            return res.status(500).json({
                error: true,
                code: 128,
                message: err.message
            })
        })
        
    }
}

export default new PerfilController()