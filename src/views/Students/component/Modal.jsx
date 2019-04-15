import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    content: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    isActive: PropTypes.string.isRequired,
  };
  render(){
    const { content, closeModal, isActive } = this.props;
    return (
      <div id="myModal" className={`mod ${isActive}`}>
        <div className="modal-content">
          <span>
            <button onClick={closeModal} className="close" type="button">
            &times;
            </button>
          </span>
          <br />
          {
            content()
          }
        </div>
      </div>
    );
  }
}

export default Modal;
