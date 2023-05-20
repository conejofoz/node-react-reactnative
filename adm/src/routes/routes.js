import React from "react";
//import { BrowserRouter, Switch, Route} from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { history } from '../history'
//import PrivateRoute from './PrivateRoute'
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import baseLogin from "../containers/login";

export default function RoutesB(){
    return (
        <BrowserRouter history={history}>
            <Routes>
                {/* <Route path="/" element={<Login />} /> */}
                {/* <Route path="/" element={baseLogin(<Login />)} /> */}
                <Route path="/" element={<baseLogin><Login /></baseLogin>} />
                
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute >
                            <Dashboard/>
                        </ProtectedRoute>
                    }
                />
                {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
        </BrowserRouter>
        
    )
}







       