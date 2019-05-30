import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

export default class CreateCourse extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
    };
  }

  handleChange = e => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState( prevState => {
       return { 
                ...prevState, [name]: value
                  }
    }
    );
}

createCourse = () => {
  axios.post('http://localhost:5000/api/courses',
  {
    title: this.state.title,
    description: this.state.description,
    estimatedTime: this.state.estimatedTime,
    materialsNeeded: this.state.materialsNeeded,
    userId: this.props.userId
  },
  {auth: {username: this.props.email, password: this.props.password}})
  .then(res => {
    if(res.status > 200 && res.status < 400) {
      this.setState(prevState => {
        return {
          ...prevState,
          courseCreated: 'Course created!',
          errors: ""
        };
      });
    }
  })
  .catch((err) => {
    this.setState(prevState => {
      return {
        ...prevState,
        errors: err.response.data.errors
      };
    });
  });
};

    render() {
        return(
    <div>
      <Header user={this.props.user}/>
      <hr/>
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
            <div className="validation-errors">
              <ul>
                {this.state.errors ? this.state.errors.map(err => <li>{err}</li>) : ""}
              </ul>
            </div>
          <form method="POST" action="http://localhost:5000/api/courses" onChange = {this.handleChange}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."/></div>
                <p>By {this.props.user}</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" placeholder="Course description..."></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours"/>
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..."></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="button" onClick={this.createCourse}>Create Course</button>
              <Link className="button button-secondary" to="/">Cancel</Link>
              <h3>{this.state.courseCreated}</h3><Link to="/" hidden={this.state.courseCreated ? false : true}>Back to courses</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
        )
    }
}