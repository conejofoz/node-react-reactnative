import React from "react";
import { Route } from 'react-router-dom'


//function PrivateRoute(props){
function PrivateRoute({path, element}){
    const logado = true
    if(logado){
        return <Route path={path} element={element} />
        //return <Route {...props} />
    }

    //return <Redirect to="/" />
}

export default PrivateRoute