import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../Login/login";
import Admin from "../../layouts/Layout";
import {messaging} from "../../firebase"

export default function Main()
{   
  // messaging.onMessage(async (payload) => {
  //   console.log('Message received. ', payload);
  //   // ...
  // });
  console.log("main");
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
                 <Route  exact path="/" component={Login} /> 
                {/* <Route path="/" component={LoginContainer}/> */}
                <Route component={DefaultContainer}/>  
                    
            </Switch>
        </div>
        
        </BrowserRouter>
    );
} 

