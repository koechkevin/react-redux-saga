import React, { Component} from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';
import moment from 'moment';
import {createStaff} from '../../redux/actions/staffActions';
import { history } from '../../App';


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
    return contains.length && contains[0].message||'';
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
  newStaff = (details) => {
    const left = details.filter((each, i) => i%2 === 0);
    const right = details.filter((each, i) => i%2 !== 0);
    const index = {
      'Teacher':1, 'Head-teacher':2, 'Super Admin':3
    };
    const {
      id, role, position, idNumber, mobile, hireDate, name
    } = this.state;
    const incomplete = !!(!role||!position||!idNumber||!mobile||!hireDate||!name);
    return (
      <form onSubmit={this.onSubmit}>
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
                            onChange={(e)=>this.setState({role: index[e.value]})}
                            value={each.options[0]}
                            className="select"
                            name="role"
                            placeholder="Select an option"
                          />
                        )
                        :(
                          <span content={this.content(each.name)} className={this.checkErrors(each.name)?'input-error':''}>
                            <input onChange={this.onChange} type={each.type} name={each.name} />
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
                        onChange={(e)=>this.setState({role: index[e.value]})}
                      />
                    ):(
                      <span content={this.content(each.name)} className={this.checkErrors(each.name)?'input-error':''}>
                        <input onChange={this.onChange} type={each.type} name={each.name} />
                      </span>
                    )
                  }
                </div>
              </div>
            ))}
            <button type="button" onClick={() => history.push('/staff')}>CANCEL</button>
            <input className={incomplete?'inactive':''} type="submit" />
          </div>
        </div>
      </form>
    );
  };
  render() {
    const details = [
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
    return (
      <div className="new-staff">
        <div className="margin">
          <h5 className="header">
           ADD A NEW STAFF
          </h5>
          <hr />
          {this.newStaff(details)}
        </div>
      </div>
    );
  }
}

const stateToProps = ({ staff: { errors }}) => ({
  errors
});

export default connect(stateToProps, { createStaff })(NewStaff);
