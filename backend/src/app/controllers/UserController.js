import * as Yup from 'Yup'
import bcrypt from 'bcryptjs'
import User from '../models/User'


class UserController {

    async index(req, res){
        const { page = 1} = req.query
        const { limit = 40} = req.query

        //await User.find().select('-senha')
        //await User.paginate({}, {select: '-senha', page:page, limit: limit})
        await User.paginate({}, {select: '_id nome email', page, limit})
            .then(users =>{
                return res.json({
                    error: false,
                    users: users
                })
            })
            .catch(err =>{
                res.status(404).json({
                    error: true,
                    code: '120',
                    message: err.message
                })
            })
    }

    async store(req, res) {

        if (typeof req.body === 'undefined') {
            return res.status(400).json({
                error: true,
                code: 102,
                message: 'Os dados do formulário não chegaram no controller'
            })
        }

        const emailExiste = (await User.findOne({ email: req.body.email }))
        if (emailExiste) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: 'Error: Este email já está cadastrado'
            })
        }

        /* 
        if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
            return res.status(400).json({ 
                error: true,
                code: 103,
                message: 'Error: Nome deve ser preenchido!'
            })
        }
        if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
            return res.status(400).json({ 
                error: true,
                code: 104,
                message: 'Error: E-mail deve ser preenchido!'
            })
        }
        if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
            return res.status(400).json({ 
                error: true,
                code: 105,
                message: 'Error: Senha deve ser preenchido!'
            })
        }
        */

        const shema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().required(),
            senha: Yup.string().required().min(6)
        })
        if (!(await shema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 105,
                message: 'Error: Dados inválidos!'
            })
        }

        let dados = req.body
        dados.senha = await bcrypt.hash(dados.senha, 7)

        const user = await User.create(dados)
            .then((resposta) => {
                return res.status(200).json({
                    error: false,
                    message: "Usuário cadastrado com sucesso!",
                    dados: resposta
                })
            })
            .catch(err => {
                return res.status(400).json({
                    error: true,
                    code: 101,
                    message: err.message
                })
            })
        //return res.json(user)
    }

    async show(req, res) {
        
        User
        .findOne({_id: req.params.id}, '_id nome email createdAt updatedAt')
        .then((umUsuario)=>{
            return res.json({
                error: false,
                user: umUsuario
            })
        })
        .catch(err => {
            return res.status(400).json({
                error: true,
                code: 102,
                message: err.message
            })
        })

    }

    async delete(req, res) {
        try {
            const userExiste = await User.findOne({ _id: req.params.id })
            if(!userExiste){
                return res.status(404).json({
                    error: true,
                    code: '115',
                    message: 'Usuário não existe!'
                })
            } 

            const user = await User.deleteOne({_id: req.params.id})
            return res.json({
                error: false,
                message: 'Usuário apagado com sucesso!'
            })

        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message
            })
        }
    }
}

export default new UserController()