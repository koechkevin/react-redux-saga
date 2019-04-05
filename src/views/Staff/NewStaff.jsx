import React, { Component} from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';
import moment from 'moment';
import {createStaff, getRoles} from '../../redux/actions/staffActions';
import { history } from '../../App';

export const Staff = ({
  data={}, isEditing, details, incomplete, onSubmit, changeDropdown, onChange, content, checkErrors
}) => {
  const left = details.filter((each, i) => i%2 === 0);
  const right = details.filter((each, i) => i%2 !== 0);
  return (
    <form onSubmit={onSubmit}>
      <div className="staff-details">
        <div className="column">
          {
            left.map((each) => (
              <div className="x" key={each.label}>
                <span className={each.required?'required':''}>
                  {each.label}
                </span>
                <div>
                  {
                    each.type === 'select'?
                      (
                        <Dropdown
                          options={each.options}
                          onChange={changeDropdown}
                          value={each.options[isEditing?data[each.role]:0]}
                          className="select"
                          name="role"
                          placeholder="Select an option"
                          disabled={!!isEditing}
                        />
                      )
                      :(
                        <span content={content(each.name)} className={checkErrors(each.name)?'input-error':''}>
                          <input defaultValue={isEditing?data[each.name]:''} onChange={onChange} type={each.type} name={each.name} />
                        </span>
                      )
                  }
                </div>
              </div>
            ))
          }
        </div>
        <div className="column">
          {right.map((each) => (
            <div className="x" key={each.label}>
              <span className={each.required?'required':''}>
                {each.label}
              </span>
              <div>
                {
                  each.type === 'select'? (
                    <Dropdown
                      options={each.options}
                      value={each.options[0]}
                      className="select"
                      placeholder="Select an option"
                      name="role"
                      onChange={changeDropdown}
                    />
                  ):(
                    <span content={content(each.name)} className={checkErrors(each.name)?'input-error':''}>
                      <input
                        defaultValue={isEditing?data[each.name]:''}
                        onChange={onChange}
                        type={each.type}
                        name={each.name} />
                    </span>
                  )
                }
              </div>
            </div>
          ))}
          <button type="button" onClick={() => history.goBack()}>CANCEL</button>
          <input className={incomplete?'inactive':''} type="submit" value={isEditing?' Edit ':'Submit'} />
        </div>
      </div>
    </form>
  );
};
class NewStaff extends Component {
  state = {
    id: '', role: '', position: '', idNumber: '', email: '', mobile: '', hireDate:'', name: '', errors: []
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  success = () => {
    history.push('/staff');
  };

  componentDidMount = () => {
    const { getRoles } = this.props;
    getRoles();
  };

  componentWillReceiveProps = (nextProps, nextContext) => {
    this.setState({ errors: nextProps.errors });
  };

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

  onSubmit = (e) => {
    const { createStaff } = this.props;
    const {
      id, role, position, idNumber, email, mobile, hireDate, name
    } = this.state;
    const data = {
      id, role, position, idNumber, email, mobile, hireDate: moment(hireDate).format('DD-MM-YYYY'), name
    };
    e.preventDefault();
    createStaff(data, this.success);
  };
  render() {
    const { roles } = this.props;
    const options = roles.map((each) => each.roleName);
    const details = [
      { label: 'Name', name: 'name', type: 'text', required: true},
      { label: 'Id Number', name: 'idNumber', type: 'text', required: true},
      { label: 'Mobile Number', name: 'mobile', type: 'number', required: true},
      { label: 'Position', name: 'position', type: 'text', required: true},
      { label: 'Email Address', name: 'email', type: 'email'},
      { label: 'Hire Date', name: 'hireDate', type: 'date', required: true},
      { label: 'Assign Role', name: 'role', type: 'select', options, required: true},
    ];

    let index = {};
    roles.forEach((e) => {
      index[e.roleName] = e.id;
    });
    const {
      role, position, idNumber, mobile, hireDate, name
    } = this.state;
    const incomplete = !!(!role||!position||!idNumber||!mobile||!hireDate||!name);
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
        <div className="new-staff">
          <div className="margin">
            <h5 className="header">
           ADD A NEW STAFF
            </h5>
            <hr />
            <Staff
              details={details}
              onSubmit={this.onSubmit}
              onChange={this.onChange}
              content={this.content}
              checkErrors={this.checkErrors}
              changeDropdown={(e)=>this.setState({role: index[e.value]})}
              incomplete={incomplete}
              isEditing={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

const stateToProps = ({ staff: { errors, roles }}) => ({
  errors, roles
});

export default connect(stateToProps, { createStaff, getRoles })(NewStaff);
