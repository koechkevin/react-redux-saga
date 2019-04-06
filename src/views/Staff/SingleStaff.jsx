import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import {fetchAllStaff} from '../../redux/actions/staffActions';
import { history} from '../../App';

class Employee extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    staff: PropTypes.array.isRequired,
    fetchAllStaff: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {fetchAllStaff, match} = this.props;
    fetchAllStaff(`?idNumber=${match.params.idNumber}`, () => null);
  }

  renderDetail = (details) => {
    const left = details.filter((each, i) => i%2 === 0);
    const right = details.filter((each, i) => i%2 !== 0);
    const {match: {params: {idNumber}}} = this.props;
    return (
      <div className="staff-details">
        <div className="column">
          {
            left.map((each) => (
              <div className="x" key={each.label}>
                {each.label}
                <div className="detail">
                  {each.value}
                </div>
              </div>
            ))
          }
        </div>
        <div className="column">
          {
            right.map((each) => (
              <div className="x" key={each.label}>
                {each.label}
                <div className="detail">
                  {each.value}
                </div>
              </div>
            ))
          }
          <a className="edit-button" href={`/staff/${idNumber}/update`}>
            <button type="button">Edit</button>
          </a>
        </div>
      </div>
    );
  };

  render(){
    const { match, staff } = this.props;
    const employee = staff.filter((staff) =>  staff.staff.idNumber === match.params.idNumber)[0];
    const details = [
      {label: 'Id Number', value: employee&&employee.staff.idNumber},
      {label: 'Employee Number', value: employee&&employee.staff.id},
      {label: 'Mobile Number', value: employee&&employee.staff.mobile},
      {label: 'Position', value: employee&&employee.staff.position},
      {label: 'Hire Date', value: employee&&moment(employee.staff.hireDate).format('DD-MM-YYYY')},
      {label: 'Roles Assigned', value: employee&&employee.role.roleName},
      {label: 'Email', value: employee?employee.staff.email||'Not Provided':' '}
    ];
    return (
      <div>
        <div className="page-header">
          <button type="button" onClick={() => history.go(-1)}>
            <i className="material-icons">
            arrow_back
            </i>
            <span className="back">Back</span>
          </button>
        </div>
        <div className="profile">
          <div className="margin">
            <h5 className="header">
              {employee&&employee.staff.name}
            </h5>
            <hr />
            {employee&&this.renderDetail(details)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ staff: { data: {staff}}}) => ({
  staff
});
export default connect(mapStateToProps, { fetchAllStaff })(Employee);
