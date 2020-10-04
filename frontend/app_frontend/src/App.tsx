import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./reducers/store";
import AdminProtectedRoute from './components/AdminProtectedRoute';
import Home from './views/Home';
import NavbarHeader from './views/NavbarHeader';
import Login from './views/Login';
import Logout from './views/Logout';
import DoQuizz from './views/DoQuizz';
import QuizzList from './views/QuizzList';
import Results from './views/Results';
import ResultsList from './views/ResultsList';
import Quizz from './views/admin/Quizz';
import EditQuizz from './views/admin/EditQuizz';
import Question from './views/admin/Question';
import User from './views/admin/User';
import Dashboard from './views/admin/Dashboard';
import { fetchUser }  from "./actions/authactions";
import AuthLoading from './components/AuthLoading';
import 'bootstrap/dist/css/bootstrap.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';



function App() {

  //store.dispatch(fetchUsers());
  
  return (
    <Provider store={store}>
      <AuthLoading>
        <Router>
          <div className="App">
            <header className="App-header">
              <NavbarHeader/>  
            </header>

            <Container>
              <Row>
                <Col md={12}>
                  <div className="wrapper">
                    <Switch>
                      <AdminProtectedRoute exact component={Dashboard} path="/dashboard"/>
                      <AdminProtectedRoute exact component={Quizz} path="/quizzs"/>
                      <AdminProtectedRoute exact component={EditQuizz} path="/edit/quizz/:quizz_id/"/>
                      <AdminProtectedRoute exact component={Question} path="/questions"/>
                      <AdminProtectedRoute exact component={User} path="/users"/>
                      <Route component={Results} path="/quizz/:quizz_id/result/:email" />
                      <Route component={DoQuizz} path="/doquizz/:quizz_id/" />
                      <Route component={QuizzList} path="/quizzlist/" />
                      <Route component={ResultsList} path="/results"/>
                      <Route component={Login} path="/login"/>
                      <Route component={Logout} path="/logout"/>
                      <Route component={Home} path="/"/>
                    </Switch>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Router>
      </AuthLoading>
    </Provider>
  );
}

export default App;

