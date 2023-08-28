import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <FontAwesomeIcon icon={faSpinner} spin size="3x" />
    </div>
  );
};

export default LoadingSpinner;
