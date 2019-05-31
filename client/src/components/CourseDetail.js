/*
  Full Stack React and REST API
  CourseDetail.js
*/

// import dependencies

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

export default class CourseDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course: ''
    };
  }

// get initial course information and set state

componentDidMount() {
  const { match: { params } } = this.props;
  axios.get(`http://localhost:5000/api/courses/${params.id}`)
  .then(res => {
    if(res.status === 500) {
      this.props.history.push('/error');
    }
      this.setState({
          course: res.data[0]
      });
  })
  .catch(() => {
    this.props.history.push('/notfound');
  })
}

// delete course method using authentication, and update state

deleteCourse = () => {
  const { match: { params } } = this.props;
  if(this.state.course.userId == this.props.userId) {
    this.setState({course: "", successMessage: "Course deleted successfully"});
    this.props.history.push(`/courses/${params.id}`);
    axios.delete(`http://localhost:5000/api/courses/${params.id}`,
    {auth: {username: this.props.email, password: this.props.password}},
    )
    .then(res => {
      if(res.status === 500) {
        this.props.history.push('/error');
      }
    });
  } else {
    this.setState(prevState => {
      return {
      ...prevState,
      message: "You are not authorised to delete this course"
      }
    })
  }
}

render() {
    return(
    <div>
      <Header user={this.props.user}/>
      <hr/>
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span>{this.props.authenticatedUser ? <Link className="button" to={"/courses/" + this.state.course.id + "/update"}>Update Course</Link> : ""}{this.props.authenticatedUser ? <button className="button" onClick={this.deleteCourse}>Delete Course</button>: ""}</span><Link
                className="button button-secondary" to="/">Return to List</Link><h3>{this.state.message}</h3></div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
          <h2>{this.state.successMessage}</h2>
            <div className="course--header">
              <h4 className="course--label">{this.state.successMessage ? "" : "Course"}</h4>
              <h3 className="course--title">{this.state.course.title}</h3>
              {this.state.successMessage ? "" : <p>Course author ID: {this.state.course.userId}</p>}
            </div>
            <div className="course--description">
              <p>{this.state.course.description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    {this.state.course.materialsNeeded}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

}