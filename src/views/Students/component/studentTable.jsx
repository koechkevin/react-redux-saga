import React from 'react';
import {Paginate} from '../../Staff/components/StaffTable';
import del from '../../../assets/images/delete.svg';

const TableHead = () => (
  <thead>
    <tr>
      <th className="mdl-data-table__cell--non-numeric table__head">
      Admission
      </th>
      <th className="mdl-data-table__cell--non-numeric table__head">
      Name
      </th>
      <th className="mdl-data-table__cell--non-numeric table__head">
      Level
      </th>
      <th className="mdl-data-table__cell--non-numeric table__head">
      Stream
      </th>
      <th className="mdl-data-table__cell--non-numeric table__head" />
    </tr>
  </thead>
);

const TableRow = ({ id, name, level, stream }) => (
  <>
    <tr className="space">
      <td className="mdl-data-table__cell--non-numeric table__data" />
      <td className="mdl-data-table__cell--non-numeric table__data" />
      <td className="mdl-data-table__cell--non-numeric table__data" />
      <td className="mdl-data-table__cell--non-numeric table__data" />
      <td className="mdl-data-table__cell--non-numeric table__data" />
    </tr>
    <tr
      className="row">
      <td className="mdl-data-table__cell--non-numeric table__data">
        {id}
      </td>
      <td className="mdl-data-table__cell--non-numeric table__data">
        {name}
      </td>
      <td className="mdl-data-table__cell--non-numeric table__data">
        {level}
      </td>
      <td className="mdl-data-table__cell--non-numeric table__data">
        {stream}
      </td>
      <td className="mdl-data-table__cell--non-numeric table__data right">
        <button type="button" onClick={() => {}}>
          <img className="tiny" src={del} alt="delete" />
        </button>
      </td>
    </tr>
  </>
);

const TableBody = ({ students }) => {
  return (
    <tbody>
      {
        students.map((each) =>{
          return(
            <TableRow
              key={each.id}
              id={each.id}
              name={each.name}
              level={each.level}
              stream={each.stream}
            />
          );
        }
        )
      }
    </tbody>
  );
};

const Table =({ students, pagination, changePage}) =>(
  <div className="staff-table">
    <table>
      <TableHead />
      <TableBody students={students} />
    </table>
    <Paginate
      pagination={pagination} changePage={changePage} />
  </div>
);

export default Table;
