/*
  Full Stack React and REST API
  UpdateCourse.js
*/

// import dependencies

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

// 'update course' component

export default class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      userId: ""
  };
}

// GET initial course data and set state

componentDidMount() {
  const { match: { params } } = this.props;
  axios.get(`http://localhost:5000/api/courses/${params.id}`)
  .then(res => {
    if(res.status === 500) {
      this.props.history.push('/error');
    }
      this.setState({
          id: parseInt(res.data[0].id),
          title: res.data[0].title,
          description: res.data[0].description,
          estimatedTime: res.data[0].estimatedTime,
          materialsNeeded: res.data[0].materialsNeeded,
          userId: res.data[0].userId
      });
  })
  .catch(() => {
    this.props.history.push('/notfound');
  });
}

// make a PUT request to update course only if the course's user ID matches the ID of the current user

updateCourse = () => {
    const { match: { params } } = this.props;
    if(this.state.userId == this.props.userId) {
    axios.put(`http://localhost:5000/api/courses/${params.id}`, 
    {
      title: this.state.title,
      description: this.state.description,
      estimatedTime: this.state.estimatedTime,
      materialsNeeded: this.state.materialsNeeded,
    },
    {auth: {username: this.props.email, password: this.props.password}}
    )
    .then(res => {
      if(res.status === 500) {
        this.props.history.push('/error');
      } else if(res.status > 200 && res.status < 400) {
          this.setState(prevState => {
            return {
              ...prevState,
              successMessage: "Course updated successfully",
              errors: "",
            };
          });
      }
    }
)
    .catch(err => {
      this.setState(prevState => {
        return {
          ...prevState,
          errors: err.response.data.errors
        }
      })
    })
  } else {
    this.props.history.push('/forbidden')
  }
};

// update state when form value is changed by the user

handleChange = e => {
  let value = e.target.value;
  let name = e.target.name;
  this.setState( prevState => {
     return { 
              ...prevState,
              [name]: value
                }
  }
  );
}

    render() {
        return(
    <div>
    <Header user={this.props.user}/>
      <hr/>
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <div className="validation-errors">
            <ul>
              {this.state.errors ? this.state.errors.map(err => <li>{err}</li>) : ""}
            </ul>
          </div>
          <form onChange={this.handleChange}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                    value={this.state.title}/></div>
                <p>Course author ID: {this.state.userId}</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" placeholder="Course description..." value={this.state.description}></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" value={this.state.estimatedTime}/></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={this.state.materialsNeeded}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="button" onClick={this.updateCourse}>Update Course</button>
              <Link className="button button-secondary" to={"/courses/" + this.state.id}>Cancel</Link>
              <h2>{this.state.successMessage}{this.state.successMessage ? <Link to="/"> - Back to courses</Link> : ""}</h2>
            </div>
          </form>
        </div>
      </div>
    </div>
        )
    }
}