/*
    Full Stack React and REST API
    Courses.js
*/

//import dependencies

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

export default class Courses extends Component {

// set initial state

    state = {
        courses: []
      }
    
// fetch courses from API and set state

      componentDidMount() {
        axios.get('http://localhost:5000/api/courses')
        .then(res => {
            if(res.status === 500) {
                this.props.history.push('/error');
                }
            this.setState({
                courses: res.data
            });
            });
    }

// map course data onto list elements

    courseList = () => {
        return this.state.courses.map(course => 
            <React.Fragment key={course.id}>
                <div className="grid-33"><Link className="course--module course--link" to={"courses/" + course.id}>
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{course.title}</h3>
                </Link></div>
            </React.Fragment>
        )};

    render() {
        return(
            <div>
                <Header user={this.props.user}/>
                <div className="bounds">
                {this.courseList()}
                    <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
                        <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>New Course</h3>
                    </Link></div>
                </div>
            </div>
        )
    }
}