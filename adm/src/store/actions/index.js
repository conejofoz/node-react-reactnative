import axios from 'axios'
import { api } from '../../config/index.js'
import { getToken, saveToke } from './localStorage.js';
import errorHandling from './errorHandling.js';

export const handleLogin = ({email, senha}, callback) =>{
    return function(dispatch){
        axios.post(api + '/login', {email,senha})
        .then((response)=>{
            saveToke(response.data);
            getToken()
        })
        .catch((error)=> callback(errorHandling(error)));
    }
}