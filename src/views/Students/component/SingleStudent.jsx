import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {fetchAllStudents} from '../../../redux/actions/studentsActions';

class SingleStudent extends React.Component {
  static propTypes = {
    fetchAllStudents: propTypes.func.isRequired,
    match: propTypes.object.isRequired,
    data: propTypes.object.isRequired
  };
  componentDidMount = () => {
    const { fetchAllStudents, match: { params: {admission} }} = this.props;
    fetchAllStudents(`?adm=${admission}`);
  };

  render(){
    const { data: { students }} = this.props;
    return (
      <div className="single-student">
        {
          students.length? (
            <div className="content">
              <span name="name" className="student-data">
                {students[0].name}
              </span>
              <span name="name" className="student-data">
                {students[0].id}
              </span>
              <span name="name" className="student-data">
                {students[0].level}
              </span>
              <span name="name" className="student-data">
                {students[0].guardian}
              </span>
              <span name="name" className="student-data">
                {students[0].stream}
              </span>
              <span name="name" className="student-data">
                {moment(students[0].createdAt, 'DD-MM-YYYY').format('DD-MM-YYYY')}
              </span>
            </div>
          ):''
        }
      </div>
    );
  }
}
const mapStateToProps = ({ students: { data }}) => ({
  data
});
export default connect(mapStateToProps, { fetchAllStudents })(SingleStudent);
