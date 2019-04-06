import React, {Component} from 'react';
import moment from 'moment/moment';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import del from '../../../assets/images/delete.svg';

class TableRow extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    idNumber: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    hireDate: PropTypes.string.isRequired,
    handleShuffle: PropTypes.func.isRequired,
    deleteStaff: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  };

  componentDidMount = () => {
    const {id} = this.props;
    document.getElementById(id).addEventListener('dragover', this.handleDragOver);
  };

  componentWillUnmount = () => {
    const {id} = this.props;
    document.getElementById(id).removeEventListener('dragover', this.handleDragOver);
  };

  handleDragOver = (e) => {
    const {id} = this.props;
    e.preventDefault();
    e.target.id = id;
  };

  drop = (e) => {
    e.preventDefault();
    const currentPosition = e.dataTransfer.getData('initialPosition');
    const {newPosition} = this.state;
    const {handleShuffle} = this.props;
    handleShuffle({currentPosition, newPosition});
  };

  allowDrop = (e) => {
    e.preventDefault();
    this.setState({newPosition: e.target.id});
  };
  dragStart = (e) => e.dataTransfer.setData('initialPosition', e.target.id);
  onDelete = () => {
    const { deleteStaff, idNumber, location: { search } } = this.props;
    swal({
      title: 'Delete?',
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((deleted) => {
      if (deleted) deleteStaff(idNumber, search);
    });
  };

  render() {
    const {idNumber, name, role, hireDate, id} = this.props;
    return (
      <>
        <tr className="space">
          <td className="mdl-data-table__cell--non-numeric table__data" />
          <td className="mdl-data-table__cell--non-numeric table__data" />
          <td className="mdl-data-table__cell--non-numeric table__data" />
          <td className="mdl-data-table__cell--non-numeric table__data" />
          <td className="mdl-data-table__cell--non-numeric table__data" />
        </tr>
        <tr
          className="row"
          id={id}
          draggable onDrop={this.drop}
          onDragOver={this.allowDrop}
          onDragStart={this.dragStart}
        >
          <td className="mdl-data-table__cell--non-numeric table__data">
            <a href={`/staff/${idNumber}`}>{idNumber}</a>
          </td>
          <td className="mdl-data-table__cell--non-numeric table__data">
            {name}
          </td>
          <td className="mdl-data-table__cell--non-numeric table__data">
            {role}
          </td>
          <td className="mdl-data-table__cell--non-numeric table__data">
            {moment(hireDate).format('DD-MM-YYYY')}
          </td>
          <td className="mdl-data-table__cell--non-numeric table__data right">
            <button type="button" onClick={this.onDelete}>
              <img className="tiny" src={del} alt="delete" />
            </button>
          </td>
        </tr>
      </>
    );
  }
}

export default TableRow;
