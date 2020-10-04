import React,{ useState,useEffect } from 'react';
import {
  Link,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import axios from 'axios';



const NavbarHeader = (props: any) => {

  const auth = useSelector((state: any) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(()=>{
    setAuthenticated(auth.isAuthenticated);
  },[auth]);

  useEffect(()=>{
    if (auth.token) {
      // Add a request interceptor
      axios.interceptors.request.use(function (config: any) {
        config.headers.Authorization = auth.token;
        return config;
      });
    }
  },[auth.token]);
  
  return (
    
        <Navbar bg="success" variant="light">
          <Container>

            <Navbar.Brand>
              <Link to={"/"} className="nav-link">
                Quizz Manager
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/quizzlist"} className="nav-link">
                  Take Quizz
                </Link>
                <Link to={"/results"} className="nav-link">
                  Results
                </Link>
                {
                  isAuthenticated ?
                  <Link to={"/dashboard"} className="nav-link">
                    Dashboard
                  </Link>:
                  null
                }
                {
                  isAuthenticated ? 
                  <Link to={"/logout"} className="nav-link">
                    Logout
                  </Link>:
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                }
                
              </Nav>
            </Nav>

          </Container>
        </Navbar>
  );
  
}

export default NavbarHeader;

