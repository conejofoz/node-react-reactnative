import React from "react";
import { Route } from 'react-router-dom'


function PrivateRoute(props){
    const logado = true
    if(logado){
        return <Route {...props} />
    }
}

export default PrivateRoute