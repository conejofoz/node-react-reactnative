import bcrypt from 'bcryptjs'
import User from '../models/User'

class LoginController{

    async store(req, res){
        const { email, password } = req.body
        
        const userExiste = await User.findOne({ email: email})
        if(!userExiste){
            return res.status(404).json({ 
                error: true,
                code: 110,
                message: 'Usuário não existe no cadastro!' 
            })
        }
        
        if(! (await bcrypt.compare(password, userExiste.senha))){
            return res.status(400).json({ 
                error: true,
                code: 111,
                message: 'Credenciais inválidas' 
            })
        }


        res.status(200).json({ email: email, password: password})
    }
}

export default new LoginController()