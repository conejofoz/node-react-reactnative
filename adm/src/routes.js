import React from "react";
//import { BrowserRouter, Switch, Route} from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function RoutesB(){
    return (
        <BrowserRouter>
{/*             <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
 */}           
  

            {/* <Routes>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" component={Dashboard} />
            </Routes> */}


            {/* Switch foi subistituido por Routes no react-router-dom 6 */}
            <Routes>
                <Route path="/" exact element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}