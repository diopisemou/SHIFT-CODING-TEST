import React from 'react';
import {
  Typography,
  ListItemIcon,
  Divider,
  MenuList,
  MenuItem
}from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import sidelogo from '../logo.svg';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitIcon from '@material-ui/icons/ExitToApp';

import  languageJson  from "../config/language";
import {
  signOut
}  from "../actions/authactions";


function AppMenuAdmin() {
  const dispatch = useDispatch();
  const LogOut = () => {
    dispatch(signOut());
  };
  

    return (

      <div>
        <div style={{display: 'flex', justifyContent: 'center',backgroundColor:'#000'}}>
          <img style={{marginTop:'20px',marginBottom:'20px',width:'150px',height:'150px'}} src={sidelogo} alt="Logo" />
        </div>
        <Divider/>
        <MenuList>
          <MenuItem component={Link} to="/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <Typography variant="inherit">{languageJson.dashboard_text}</Typography>
          </MenuItem>
          <MenuItem component={Link} to="/quizzs">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <Typography variant="inherit">{languageJson.quizzs_text}</Typography>
          </MenuItem>
          <MenuItem component={Link} to="/questions">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <Typography variant="inherit">{languageJson.questions_text}</Typography>
          </MenuItem>
          <MenuItem component={Link} to="/users">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <Typography variant="inherit">{languageJson.users_text}</Typography>
          </MenuItem>
          <MenuItem onClick={LogOut}>
            <ListItemIcon>
              <ExitIcon />
            </ListItemIcon>
            <Typography variant="inherit">{languageJson.logout}</Typography>
          </MenuItem> 
        </MenuList>
      </div> 
  );
}

export default AppMenuAdmin;