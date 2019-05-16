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
    // eslint-disable-next-line react/prop-types
    const { fetchAllStaff } = this.props;
    history.push(`/staff?page=${e.target.value}`);
    fetchAllStaff(`?page=${e.target.value}`);
  };
  renderPages = (pageCount, currentPage) => {
    let output = [];
    for(let i =1; i<=pageCount; i++){
      if(i===1||i===currentPage||i===currentPage-1||i===currentPage+1||i===pageCount) {
        output.push(i);
      }
    }
    if(output.length >= 3 && output[1] - output[0]>1) output.splice(1,0,'..');
    if(output.length>=3 && output[output.length-1] - output[output.length-2]>1) output.splice(output.length-1,0,'...');
    return output;
  };
  render() {
    const { pagination: { currentPage, pageCount }, changePage } = this.props;
    return (
      <div className="paginate pagination">
        <button
          onClick={changePage||this.onPageChange}
          value={1}
          className={!currentPage || currentPage === 1?'inactive':''}
          type="button">
          &laquo;
        </button>
        <button
          onClick={changePage||this.onPageChange}
          value={currentPage-1}
          className={!currentPage || currentPage === 1?'inactive':''}
          type="button">
          Previous
        </button>
        {
          this.renderPages(pageCount, currentPage).map((e) => {
            return (
              <button
                className={!currentPage || currentPage === e || e === '...' || e==='..'?'inactive':''}
                onClick={changePage||this.onPageChange}
                value={e === '..'?'...':e}
                type="button"
                key={e}
              >
                {e === '..'?'...':e}
              </button>
            );
          })
        }
        <button
          onClick={changePage||this.onPageChange}
          value={currentPage+1}
          className={!currentPage || currentPage === pageCount?'inactive':''}
          type="button">
         Next
        </button>
        <button
          onClick={changePage||this.onPageChange}
          value={pageCount}
          className={!currentPage || currentPage === pageCount?'inactive':''}
          type="button">
          &raquo;
        </button>

        {/*<button*/}
        {/*  type="button" name="previous"*/}
        {/*  className={!currentPage || currentPage === 1?'inactive':''}*/}
        {/*  onClick={changePage||this.onPageChange}>*/}
        {/*  Previous*/}
        {/*</button>*/}
        {/*<span className="current-page">*/}
        {/*  {`${currentPage} of ${pageCount}`}*/}
        {/*</span>*/}
        {/*<button*/}
        {/*  name="next"*/}
        {/*  className={!currentPage || currentPage >= pageCount?'inactive':''}*/}
        {/*  type="button" onClick={changePage||this.onPageChange}>*/}
        {/*  Next*/}
        {/*</button>*/}
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
