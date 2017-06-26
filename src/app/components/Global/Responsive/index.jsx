import React from 'react';
import PropTypes from 'prop-types';
import withWidth from 'material-ui/utils/withWidth';

export const Responsive = ({ small, medium, large, width, ...rest }) => {

  let component;

  switch (width) {

    case 1:
      if (small) component = small;
      else if (medium) component = medium;
      else component = large;
      break;

    case 2:
      if (medium) component = medium;
      else if (large) component = large;
      else component = small;
      break;

    case 3:
      if (large) component = large;
      else if (medium) component = medium;
      else component = small;
      break;

    default:
      throw new Error(`Unknown width ${ width }`);

  }

  return React.cloneElement(component, rest);

};

Responsive.propTypes = {
  small: PropTypes.element,
  medium: PropTypes.element,
  large: PropTypes.element,
  width: PropTypes.number
};

export default withWidth()(Responsive);
