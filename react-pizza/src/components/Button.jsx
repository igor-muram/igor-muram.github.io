import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ onClick, className, outline, add, circle, children }) => {
  return (
    <button
      onClick={onClick}
      className={classNames('button', className, {
        'button--outline': outline,
        'button--add': add,
        'button--circle': circle,
      })}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  outline: PropTypes.bool,
  add: PropTypes.bool,
  circle: PropTypes.bool,
};

export default Button;
