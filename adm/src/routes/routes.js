import React from "react";
//import { BrowserRouter, Switch, Route} from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { history } from '../history'
//import PrivateRoute from './PrivateRoute'
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/Login";
import RecuperarSenha from "../pages/RecuperarSenha";
import Dashboard from "../pages/Dashboard";
import Perfil from "../pages/Perfil";
//import baseLogin from "../containers/login";
import { PaiLogin } from "../containers/login/PaiLogin";
import { PaiDashboard } from "../containers/dashboard";
import { PaiPerfil } from "../containers/perfil";

export default function RoutesB(){
    return (
        <BrowserRouter history={history}>
            <Routes>
                {/* <Route path="/" element={<Login />} /> */}
                {/* <Route path="/" element={baseLogin(<Login />)} /> */}
                {/* <Route path="/" element={<baseLogin><Login /></baseLogin>} /> */}
                <Route path="/" element={<PaiLogin><Login /></PaiLogin>}/>
                <Route path="/recuperar-senha" element={<PaiLogin><RecuperarSenha/></PaiLogin>}/>
                
                
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute >
                            <PaiDashboard><Dashboard/></PaiDashboard>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/perfil"
                    element={<ProtectedRoute>
                        <PaiPerfil><Perfil/></PaiPerfil>
                    </ProtectedRoute>}
                 />
                {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
        </BrowserRouter>
        
    )
}







       