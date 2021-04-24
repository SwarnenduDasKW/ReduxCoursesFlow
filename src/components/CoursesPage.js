import React, { useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../redux/actions/courseAction";

function CoursesPage(props) {
  const [course, setCourse] = useState({ title: "" });

  const handleChange = (event) => {
    //const state = { ...course, title: event.target.value };
    //setCourse(state);
    setCourse((data) => ({ ...data, title: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createCourse(course);
    setCourse((data) => ({ ...data, title: "" }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={handleChange}
          value={course.title}
          ref={(input) => input && input.focus()}
        />
        <input type="submit" value="Save" />
        {props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createCourse: (course) => dispatch(courseActions.createCourse(course)),
  };
}

// This is two function calls side by side. Connect returns a function and that function then calls our component.
// the below two lines does the same thing which the last line is doing
//const connectedStateandProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateandProps(CoursesPage)

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
