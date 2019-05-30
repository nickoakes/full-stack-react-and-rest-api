import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Header from './Header';

class UserSignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emailAddress: [],
      password: []
    };
  }

  handleEmail = (event) => {
    this.setState({emailAddress: event.target.value})
  }

  handlePassword = (event) => {
    this.setState({password: event.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()
  }

    render() {
        return(
    <div>
      <Header user={this.props.user}/>
      <hr/>
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <h3>{this.props.message}{this.props.user ? <Link to='/'> - Back to courses</Link> : ""}</h3>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange = {this.handleEmail}/></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handlePassword} /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit" onClick={() => this.props.signIn(this.state.emailAddress, this.state.password)}>Sign In</button><Link className="button button-secondary" to='/'>Cancel</Link></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
    </div>
        )
    }
}

export default withRouter(UserSignIn)