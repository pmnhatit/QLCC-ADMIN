import  React, { Component } from  "react";
import { Route, Redirect } from  "react-router-dom";

export const  PrivateRoute= ({component:Component, ...rest})=>
(// console.log( JSON.parse(localStorage.getItem("state")).user);
    <Route
    { ...rest }
        render={props=>
            JSON.parse(localStorage.getItem("state")).user.token?(
            <Component {...props}/>
        ):(
        <Redirect to={{
            pathname:"/",
            state:{from:props.location}
        }}
        />
        )
        }/>
        
   
);
