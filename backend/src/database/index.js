import mongoose from "mongoose"

class DataBase {
    constructor() {
        this.mongoDataBase()
    }

    mongoDataBase() {
        //mongoose.connect('mongodb://127.0.0.1/apinode', {useNewUrlParser: true, useUnifiedTopology: true});
        mongoose.connect('mongodb://127.0.0.1/apinode')
            .then(() => {
                console.log('Conexão com MongoDB realizada!')
            })
            .catch((erro) => {
                console.log(`Error: Conexão com o MongoDB falhou ${erro}`)
            })
    }
}

export default new DataBase()