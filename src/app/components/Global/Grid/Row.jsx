import React from 'react';

const styles = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  margin: '0 -12px'
};

const Row = ({ children, ...rest }) => {
  const component = (
    <div style={ styles }>
      { children }
    </div>
  );
  return React.cloneElement(component, rest);
};

export default Row;
