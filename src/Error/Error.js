import React from 'react';
import {
  Link
} from 'react-router-dom';

const ErrorView = () => {
    return (
      <div>
        The character page you requested does not exist.
        <Link to="/">Return to Home Page</Link>
      </div>
    );
  };

export default ErrorView;
