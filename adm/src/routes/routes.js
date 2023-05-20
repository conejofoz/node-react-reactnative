import React from "react";
//import { BrowserRouter, Switch, Route} from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { history } from '../history'
//import PrivateRoute from './PrivateRoute'
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
//import baseLogin from "../containers/login";
import { PaiLogin } from "../containers/login/PaiLogin";

export default function RoutesB(){
    return (
        <BrowserRouter history={history}>
            <Routes>
                {/* <Route path="/" element={<Login />} /> */}
                {/* <Route path="/" element={baseLogin(<Login />)} /> */}
                {/* <Route path="/" element={<baseLogin><Login /></baseLogin>} /> */}
                <Route path="/" element={<PaiLogin><Login /></PaiLogin>}/>
                
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute >
                            <PaiLogin><Dashboard/></PaiLogin>
                        </ProtectedRoute>
                    }
                />
                {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
        </BrowserRouter>
        
    )
}







       