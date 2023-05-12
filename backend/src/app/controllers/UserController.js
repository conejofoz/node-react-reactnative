import User from '../models/User'

class UserController {
    async store(req, res) {
        if (typeof req.body === 'undefined') {
            return res.status(400).json({ 
                error: true,
                code: 102,
                message: 'Os dados do formulário não chegaram no controller'
             })
        }

        const emailExiste = await User.findOne({ email: req.body.email})
        if(emailExiste) {
            return res.status(400).json({ 
                error: true,
                code: 102,
                message: 'Error: Este email já está cadastrado'
            })
        }

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




        const user = await User.create(req.body)
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
}

export default new UserController()