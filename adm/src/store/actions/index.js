import axios from 'axios'
import { api } from '../../config/index.js'

export const handleLogin = ({email, senha}, callback) =>{
    return function(dispatch){
        console.log('chegou aqui', email, senha);
        axios.post(api + '/login', {email,senha})
        .then((response)=>{
            console.log(response.data);
        })
        .catch((error)=>{
            console.log(error.response.data);
        })
    }
}