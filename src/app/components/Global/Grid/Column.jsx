import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  flex: '0 0 auto',
  padding: '0 12px'
};

const Row = ({ span, children, ...rest }) => {

  const width = (Math.round(span) / 12) * 100;
  
  const component = (
    <div style={ Object.assign({}, styles, { width: `${ width }%` }) }>
      { children }
    </div>
  );
  
  return React.cloneElement(component, rest);
  
};

Row.propTypes = {
  span: PropTypes.number
};

Row.defaultProps = {
  span: 1
};

export default Row;
