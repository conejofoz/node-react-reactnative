import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import configAuth from '../../config/auth'

export default async(req, res, next) =>{

    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({
            error: true,
            code: 130,
            message: 'Não autorizado!'
        })
    }

    //const [bearer, token] = authHeader.split(' ')
    const [, token] = authHeader.split(' ')

    try {
        const decoded = await promisify(jwt.verify)(token, configAuth.secret)
        //criar uma nova chave na requisição
        req.userId = decoded.id
        return next()
    } catch (error) {
        return res.status(401).json({
            error: true,
            code: 131,
            message: 'Token inválido!'
        })
    }
}