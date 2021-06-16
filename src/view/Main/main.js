import React  from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../Login/login";
import Admin from "../../layouts/Layout";


export default function Main()
{
    
    const LoginContainer = () => (
        <div className="container">
          {/* <Route exact path="/" render={() => <Redirect to="/login" />} /> */}
          <Route path="/login" component={Login} />
        </div>
      )
      
      
       const DefaultContainer = () => (
          <div>
               <Admin/>
               {/* <Route path="/user/detail/:id" component={DetailUser}/>
               <Route path="/add/apart" component={AddApart} /> 
               <Route exact path="/" render={() => <Redirect to="/home" />} /> */}
               
               
          </div>
       )
    return (
        <BrowserRouter>
      
        <div className="main-route-place">
            <Switch>        
                <Route exact path="/login" component={LoginContainer}/>
                <Route component={DefaultContainer}/>
            </Switch>
        </div>
        
        </BrowserRouter>
    );
} 

