import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ onClick, className, outline, children }) => {
  return (
    <button
      onClick={onClick}
      className={classNames('button', className, {
        'button--outline': outline,
      })}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  outline: PropTypes.bool.isRequired,
};

export default Button;
