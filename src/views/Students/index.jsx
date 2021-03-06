import React, { Component } from 'react';
import { connect } from  'react-redux';
import PropTypes from 'prop-types';
import PageHeader from '../Staff/components/PageHeader';
import Table from './component/studentTable';
import {createStudent, fetchAllStudents} from '../../redux/actions/studentsActions';
import {history} from '../App';
import Modal from './component/Modal';
import NewStudent from './component/NewStudent';

class Students extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    fetchAllStudents: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    createStudent: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired
  };

  state = {
    isActive: 'close'
  };
  componentDidMount() {
    const { fetchAllStudents, location: { search }  } = this.props;
    fetchAllStudents(search);
  }
  content = () => {
    const { createStudent, errors } = this.props;
    return (
      <NewStudent errors={errors} createStudent={createStudent} />
    );
  };
  onPageChange = (e) => {
    const {fetchAllStudents } = this.props;
    history.push(`/students?page=${e.target.value}`);
    fetchAllStudents(`?page=${e.target.value}`);
  };
  render() {
    const { data: { students, pagination }} = this.props;
    const { isActive } = this.state;
    return (
      <div className="body">
        <PageHeader
          buttonValue="NEW STUDENT"
          onClick={() => this.setState({ isActive: ''})} heading="Students" />
        <Modal isActive={isActive} content={this.content} closeModal={() => this.setState({ isActive: 'close'})} />
        <Table students={students} changePage={this.onPageChange} pagination={pagination} />
      </div>
    );
  }
}

const mapStateToProps = ({ students: { data, errors }}) => ({
  data, errors
});
export default connect(mapStateToProps, { fetchAllStudents, createStudent })(Students);
