import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = ({ heading, onClick, buttonValue }) => (
  <div className="first-header">
    <div>
      <span className="page-title left">
        {heading}
      </span>
      <span className="right">
        <button type="button" onClick={onClick}>
          {buttonValue}
        </button>
      </span>
    </div>
  </div>
);

PageHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonValue: PropTypes.string.isRequired
};

export default PageHeader;
