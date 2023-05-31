const errorHandling = (error) =>{
    //console.log(error)

    if(!error.response || !error.response.data){
        return {status: 500, erro: {message: "Ocorreu um erro no servidor. Tente mais tarde!"}}
    }
    return {erro: error.response.data}
}

export default errorHandling