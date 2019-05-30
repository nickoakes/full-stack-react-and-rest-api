
//import dependencies

import React, {Component} from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';

// import components
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import PrivateRoute from './components/PrivateRoute';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      authenticatedUser: false
    };
  }

  signIn = (email, password) => {
    axios.get('http://localhost:5000/api/users', {auth: {username: email, password: password}})
    .then(res => {
        this.setState({
          user: res.data,
          email: email,
          password: password,
          authenticatedUser: true,
          message: "Signed in"
        })
    })
    .catch(err => {
        this.setState(prevState => {
          return {
            ...prevState,
            message: "Email address and/ or password not recognised"
          };
        });
    })
  }

  signOut = () => {
    this.setState({
      user: [],
      authenticatedUser: false,
      message: ""
    })
  }

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Courses user={this.state.user.name} />} />
          <PrivateRoute path="/courses/create" authenticatedUser={this.state.authenticatedUser} user={this.state.user.name} email={this.state.email} password={this.state.password} userId={this.state.user.id} component={CreateCourse} />
          <PrivateRoute path="/courses/:id/update" authenticatedUser={this.state.authenticatedUser} user={this.state.user.name} userId={this.state.user.id} component={UpdateCourse} />
          <Route path="/courses/:id" render={(props) => <CourseDetail {...props} user={this.state.user.name} userId={this.state.user.id} email={this.state.email} password={this.state.password}/>} />
          <Route path="/signin" render={() => <UserSignIn signIn={this.signIn} message={this.state.message} user={this.state.user.name}/>} />
          <Route path="/signup" render={() => <UserSignUp />} />
          <Route path="/signout" render={() => <UserSignOut signOut={this.signOut}/>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
