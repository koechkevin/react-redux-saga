import React, {Component} from 'react';
import moment from 'moment/moment';
import PropTypes from 'prop-types';

class TableRow extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    idNumber: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    hireDate: PropTypes.string.isRequired,
    handleShuffle: PropTypes.func.isRequired,
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

  render() {
    const {idNumber, name, position, hireDate, id} = this.props;
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
            {position}
          </td>
          <td className="mdl-data-table__cell--non-numeric table__data">
            {moment(hireDate).format('DD-MM-YYYY')}
          </td>
          <td className="mdl-data-table__cell--non-numeric table__data right">
            <button type="button">
              <i className="material-icons tiny">
                more_vert
              </i>
            </button>
          </td>
        </tr>
      </>
    );
  }
}

export default TableRow;
