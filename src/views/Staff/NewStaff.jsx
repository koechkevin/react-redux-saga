import React, { Component} from 'react';
import { connect } from 'react-redux';

class NewStaff extends Component {

  newStaff = (details) => {
    const left = details.filter((each, i) => i%2 === 0);
    const right = details.filter((each, i) => i%2 !== 0);
    return (
      <form>
        <div className="staff-details">
          <div className="column">
            {
              left.map((each) => (
                <div className="x" key={each.label}>
                  {each.label}
                  <div>
                    <input type={each.type} name={each.name} />
                  </div>
                </div>
              ))
            }
          </div>
          <div className="column">
            {right.map((each) => (
              <div className="x" key={each.label}>
                {each.label}
                <div>
                  <input type={each.type} name={each.name} />
                </div>
              </div>
            ))}
            <button type="button">CANCEL</button>
            <input type="submit" />
          </div>
        </div>
      </form>
    );
  };
  render() {
    const details = [
      { label: 'Name', name: 'name', type: 'text'},
      { label: 'Id Number', name: 'idNumber', type: 'text'},
      { label: 'Mobile Number', name: 'mobile', type: 'number'},
      { label: 'Position', name: 'position', type: 'text'},
      { label: 'Email Address', name: 'email', type: 'email'},
      { label: 'Hire Date', name: 'hireDate', type: 'date'},
      { label: 'Assign Role', name: 'role', type: 'text'},
    ];
    return (
      <div className="new-staff">
        <div className="margin">
          {this.newStaff(details)}
        </div>
      </div>
    );
  }
}

export default connect(null, {})(NewStaff);
