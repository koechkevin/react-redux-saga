import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {history} from '../../App';
import {Staff} from './NewStaff';
import {fetchAllStaff, updateStaff} from '../../redux/actions/staffActions';

class EditStaff extends Component {
  state={ errors:[]};
  details = [
    { label: 'Name', name: 'name', type: 'text', required: true},
    { label: 'Id Number', name: 'idNumber', type: 'text', required: true},
    { label: 'Mobile Number', name: 'mobile', type: 'number', required: true},
    { label: 'Position', name: 'position', type: 'text', required: true},
    { label: 'Email Address', name: 'email', type: 'email'},
    { label: 'Hire Date', name: 'hireDate', type: 'date', required: true},
    { label: 'Assign Role', name: 'role', type: 'select', options: [
      'Teacher', 'Head-teacher', 'Super Admin'
    ], required: true},
  ];
  checkErrors = (name) => {
    const {errors} = this.state;
    const contains = errors.filter((e) => e.name === name);
    return !!contains.length;
  };
  content = (name) => {
    const {errors} = this.state;
    const contains = errors.filter((e) => e.name === name);
    return contains.length?contains[0].message:'';
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {updateStaff, match: { params: { idNumber } }} = this.props;
    updateStaff(idNumber, this.state);
  };
  componentDidMount = () => {
    const {fetchAllStaff, match} = this.props;
    fetchAllStaff(`?idNumber=${match.params.idNumber}`, () => null);
  };
  render() {
    const { staff } = this.props;
    const {
      role, position, idNumber, mobile, hireDate, name, email
    } = this.state;
    const incomplete = !!(!role&&!position&&!idNumber&&!mobile&&!hireDate&&!name&&!email);
    return(
      <div>
        {!staff.length?<span>Loading</span>:(
          <div>
            <div className="page-header">
              <button type="button" onClick={() => history.go(-1)}>
                <i className="material-icons">
                arrow_back
                </i>
                <span className="back">Back</span>
              </button>
            </div>
            <div className="new-staff">
              <div className="margin">
                <h5 className="header">
                  {staff[0].staff.name}
                </h5>
                <hr />
                <Staff
                  details={this.details}
                  content={this.content}
                  checkErrors={this.checkErrors}
                  isEditing
                  incomplete={incomplete}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                  data={{
                    idNumber: staff[0].staff.idNumber,
                    mobile: staff[0].staff.mobile,
                    name: staff[0].staff.name,
                    position: staff[0].staff.position,
                    email: staff[0].staff.email,
                    hireDate: moment(staff[0].staff.hireDate).format('YYYY-MM-DD')
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ staff: { data: {staff}}}) => ({
  staff
});

export default connect(mapStateToProps, { fetchAllStaff, updateStaff })(EditStaff);
