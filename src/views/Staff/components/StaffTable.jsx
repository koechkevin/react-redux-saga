import React, {Component} from 'react';
import {history} from '../../../App';
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
        Position
      </th>
      <th className="mdl-data-table__cell--non-numeric table__head">
        Hire Date
      </th>
      <th className="mdl-data-table__cell--non-numeric table__head" />
    </tr>
  </thead>
);

const TableBody = ({ staff, handleShuffle }) => {
  return (
    <tbody>
      {
        staff.map((each, i) =>{
          return(
            <TableRow
              id={i}
              key={each.staff.id}
              idNumber={each.staff.idNumber}
              name={each.staff.name}
              position={each.staff.position}
              hireDate={each.staff.hireDate}
              handleShuffle={handleShuffle}
            />
          );
        }
        )
      }
    </tbody>
  );
};

class Paginate extends Component {
  onPageChange = (e) => {
    const { pagination: { currentPage }, fetchAllStaff } = this.props;
    history.push(`/staff?page=${e.target.name === 'previous'?currentPage-1:currentPage+1}`);
    fetchAllStaff(`?page=${e.target.name === 'previous'?currentPage-1:currentPage+1}`);
  };
  render() {
    const { pagination: { currentPage, pageCount }} = this.props;
    return (
      <div className="paginate">
        <button
          type="button" name="previous"
          className={!currentPage || currentPage === 1?'inactive':''}
          onClick={this.onPageChange}>
          Previous
        </button>
        <span className="current-page">
          {`${currentPage} of ${pageCount}`}
        </span>
        <button
          name="next"
          className={!currentPage || currentPage >= pageCount?'inactive':''}
          type="button" onClick={this.onPageChange}>
          Next
        </button>
      </div>
    );
  }
}
const Table =({ staff, location, pagination, fetchAllStaff, handleShuffle } ) =>(
  <div className="staff-table">
    <table>
      <TableHead />
      <TableBody staff={staff} handleShuffle={handleShuffle} />
    </table>
    <Paginate pagination={pagination} location={location} fetchAllStaff={fetchAllStaff} />
  </div>
);

export default Table;
