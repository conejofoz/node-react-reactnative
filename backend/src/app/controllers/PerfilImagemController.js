import fs from 'fs'
import User from '../models/User'

class PerfilImagemController{
    async update(req, res){
        if(!req.file){
            return res.status(404).json({
                error: true,
                message: 'Imagem não enviada'
            })
        }
        const dadosImagem = {
            originalName: req.file.originalname,
            fileName: req.file.filename
        }

        await User.findOne({_id: req.userId}, 'id fileName')
        .catch((err) => {
            return res.status(404).json({
                error: true,
                message: err.message
            })
        })

        await User.updateOne({_id: req.userId}, dadosImagem).then((result) => {
            return res.json({
                error: false,
                message: "Imagem do perfil atualizada com sucesso!"
            })
        }).catch((err) => {
            return res.status(500).json({
                error: true,
                message: err.message
            })
        })
    }
}

export default new PerfilImagemController()