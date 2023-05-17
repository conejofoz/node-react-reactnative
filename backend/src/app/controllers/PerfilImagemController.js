import fs from 'fs'

class PerfilImagemController{
    async update(req, res){
        return res.json({
            error: false,
            message: "Upload img user"
        })
    }
}

export default new PerfilImagemController()