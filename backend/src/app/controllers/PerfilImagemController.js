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
        .then(user=>{
            req.dadosImgUser = user.fileName
        })
        .catch((err) => {
            return res.status(404).json({
                error: true,
                message: err.message
            })
        })

        await User.updateOne({_id: req.userId}, dadosImagem)
        .catch((err) => {
            return res.status(500).json({
                error: true,
                message: err.message
            })
        })

        const imgAntiga =  req.file.destination + "/" + req.dadosImgUser

        fs.access(imgAntiga, (error) => {
            if(!error) {
                fs.unlink(imgAntiga, err => {
                    //msg de imagem exluida com sucesso
                })
            } else {
                //console.log('Erro: Provavelmente o arquivo já tenha sido apagado')
            }
        }) 

        return res.json({
            error: false,
            message: "Imagem do perfil atualizada com sucesso!"
        })
    }
}

export default new PerfilImagemController()