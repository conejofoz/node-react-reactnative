import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import configAuth from '../../config/auth'

class LoginController{

    async store(req, res){
        const { email, senha } = req.body
        
        const userExiste = await User.findOne({ email: email})
        if(!userExiste){
            return res.status(404).json({ 
                error: true,
                code: 110,
                message: 'Usuário não existe no cadastro!' 
            })
        }
        
        if(! (await bcrypt.compare(senha, userExiste.senha))){
            return res.status(400).json({ 
                error: true,
                code: 111,
                message: 'Credenciais inválidas' 
            })
        }


        res.status(200).json({
            user:{
                id: userExiste._id,
                nome: userExiste.nome,
                email: userExiste.email
            },
            token: jwt.sign({id: userExiste._id}, configAuth.secret, {expiresIn:configAuth.expiresIn} )

        })
    }
}

export default new LoginController()