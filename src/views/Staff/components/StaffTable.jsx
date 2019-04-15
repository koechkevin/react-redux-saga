import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {history} from '../../App';
import TableRow from './TableRow';

const TableHead = () => (
  <thead>
    <tr>
      <th className="mdl-data-table__cell--non-numeric table__head">
        Id Number
      </th>
      <th className="mdl-data-table__cell--non-numeric table__head">
        Name
      </th>
      <th className="mdl-data-table__cell--non-numeric table__head">
        Role
      </th>
      <th className="mdl-data-table__cell--non-numeric table__head">
        Hire Date
      </th>
      <th className="mdl-data-table__cell--non-numeric table__head" />
    </tr>
  </thead>
);

const TableBody = ({ staff, handleShuffle, deleteStaff, match, location }) => {
  return (
    <tbody>
      {
        staff.map((each, i) =>{
          return(
            <TableRow
              id={i}
              key={each.id}
              idNumber={each.staff.idNumber}
              name={each.staff.name}
              role={each.role['roleName']}
              hireDate={each.staff.hireDate}
              handleShuffle={handleShuffle}
              deleteStaff={deleteStaff}
              match={match}
              location={location}
            />
          );
        }
        )
      }
    </tbody>
  );
};

export class Paginate extends Component {
  static propTypes = {
    pagination: PropTypes.object.isRequired
  };
  onPageChange = (e) => {
    const { pagination: { currentPage }, fetchAllStaff } = this.props;
    history.push(`/staff?page=${e.target.name === 'previous'?currentPage-1:currentPage+1}`);
    fetchAllStaff(`?page=${e.target.name === 'previous'?currentPage-1:currentPage+1}`);
  };
  render() {
    const { pagination: { currentPage, pageCount }, changePage } = this.props;
    return (
      <div className="paginate">
        <button
          type="button" name="previous"
          className={!currentPage || currentPage === 1?'inactive':''}
          onClick={changePage||this.onPageChange}>
          Previous
        </button>
        <span className="current-page">
          {`${currentPage} of ${pageCount}`}
        </span>
        <button
          name="next"
          className={!currentPage || currentPage >= pageCount?'inactive':''}
          type="button" onClick={changePage||this.onPageChange}>
          Next
        </button>
      </div>
    );
  }
}
const Table =({ staff, location, pagination, fetchAllStaff, handleShuffle, deleteStaff, match} ) =>(
  <div className="staff-table">
    <table>
      <TableHead />
      <TableBody
        staff={staff} handleShuffle={handleShuffle} deleteStaff={deleteStaff} location={location} match={match} />
    </table>
    <Paginate pagination={pagination} location={location} fetchAllStaff={fetchAllStaff} />
  </div>
);

const props = {
  staff: 'string', location: 'object',
  pagination: 'object', fetchAllStaff: 'func',
  handleShuffle: 'func', deleteStaff: 'func', match: 'object'
};

TableBody.propTypes = () => {};

Table.propTypes = () => {
  let output = {};
  Object.keys(props).forEach((e) => {
    output[e] = PropTypes[props[e]].isRequired;
  });
  return output;
};

export default Table;
