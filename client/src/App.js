
//import dependencies

import React, {Component} from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';
import * as Cookies from 'js-cookie';

// import components
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

//app component

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Cookies.get('id') || "",
      name: Cookies.get('name') || "",
      authenticatedUser: Cookies.get('authenticatedUser') || false,
      email: Cookies.get('email') || "",
      password: Cookies.get('password') || ""
    };
  }

  signIn = (email, password) => {
    axios.get('http://localhost:5000/api/users', {auth: {username: email, password: password}})
    .then(res => {
      if(res.status === 500) {
        this.props.history.push('/error');
      }
        this.setState({
          id: res.data.id,
          name: res.data.name,
          email: email,
          password: password,
          authenticatedUser: true,
        })

        Cookies.set('id', res.data.id)
        Cookies.set('name', res.data.name)
        Cookies.set('email', email)
        Cookies.set('password', password)
        Cookies.set('authenticatedUser', true)

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
      id: "",
      name: "",
      authenticatedUser: false,
      email: "",
      password: "",
      message: ""
    })

    Cookies.remove('id')
    Cookies.remove('name')
    Cookies.remove('authenticatedUser')
    Cookies.remove('email')
    Cookies.remove('password')
    Cookies.remove('message')
  }

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Courses user={this.state.name} />} />
          <PrivateRoute path="/courses/create" authenticatedUser={this.state.authenticatedUser} user={this.state.name} email={this.state.email} password={this.state.password} userId={this.state.id} component={CreateCourse} />
          <PrivateRoute path="/courses/:id/update" authenticatedUser={this.state.authenticatedUser} user={this.state.name} userId={this.state.id} component={UpdateCourse} />
          <Route path="/courses/:id" render={(props) => <CourseDetail {...props} authenticatedUser={this.state.authenticatedUser} user={this.state.name} userId={this.state.id} email={this.state.email} password={this.state.password}/>} />
          <Route path="/signin" render={() => <UserSignIn signIn={this.signIn} message={this.state.message} user={this.state.name}/>} />
          <Route path="/signup" render={() => <UserSignUp />} />
          <Route path="/signout" render={() => <UserSignOut signOut={this.signOut}/>} />
          <Route path="/notfound" render={() => <NotFound user={this.state.name} />} />
          <Route path="/forbidden" render={() => <Forbidden user={this.state.name} />} />
          <Route path="/error" render={() => <UnhandledError user={this.state.name} />} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
