import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import { useSelector } from "react-redux";
import ResponsiveDrawer from './ResponsiveDrawer';


const AdminProtectedRoute : React.FC<any> = ({ component: Component, ...rest }) =>  {
    const auth = useSelector((state: any) => state.auth);
    return(
        <Route {...rest} render={props => (
            // auth.info && auth.usertype === "Admin"  ?
            auth.isAuthenticated  ?
            <ResponsiveDrawer> <Component {...props} /> </ResponsiveDrawer>
            : <Redirect to="/login" />
        )} />
    )
}

export default AdminProtectedRoute;