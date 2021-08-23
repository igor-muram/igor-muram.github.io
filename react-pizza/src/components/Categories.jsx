import React from 'react';
import PropTypes from 'prop-types';

export default function Categories({ items }) {
  const [activeItem, setActiveItem] = React.useState(null);

  return (
    <div className="categories">
      <ul>
        <li className={activeItem === null ? 'active' : ''} onClick={() => setActiveItem(null)}>
          Все
        </li>
        {items?.map((name, index) => (
          <li
            className={activeItem === index ? 'active' : ''}
            onClick={() => setActiveItem(index)}
            key={`${name}_${index}`}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

Categories.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Categories.defaultProps = {
  items: [],
};
