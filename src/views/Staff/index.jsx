import React, { Component } from 'react';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteStaff, fetchAllStaff, handleShuffle} from '../../redux/actions/staffActions';
import Table from './components/StaffTable';
import HigherOrderComponent from '../../HOC/Authenticate';
import PageHeader from './components/PageHeader';
import { history} from '../../App';

class Staff extends Component {
  static propTypes = {
    fetchAllStaff: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    handleShuffle: PropTypes.func.isRequired,
    deleteStaff: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchAllStaff, location: { search } } = this.props;
    fetchAllStaff(search, () => this.renderAuth());
  }
  renderAuth = () => (<HigherOrderComponent Container={this} allowedRoles={['Super Admin']} />);

  onClickButton = () => {
    history.push('/staff/employee/create');
  };

  render(){
    const { data: { staff, pagination }, location, fetchAllStaff, handleShuffle, deleteStaff, match } = this.props;
    return (
      <div>
        <PageHeader buttonValue="ADD STAFF" onClick={this.onClickButton} heading="all staff" />
        <Table
          fetchAllStaff={fetchAllStaff}
          staff={staff}
          location={location}
          pagination={pagination}
          handleShuffle={handleShuffle}
          deleteStaff={deleteStaff}
          match={match}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ staff }) => ({
  data: staff.data
});

export default connect(mapStateToProps, { fetchAllStaff, handleShuffle, deleteStaff })(Staff);
