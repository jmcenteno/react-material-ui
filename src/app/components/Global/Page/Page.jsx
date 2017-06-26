import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  wrapper: {
    margin: '0 auto',
    maxWidth: 1200
  }
};

const Page = ({ children, ...rest }) => {
  
  const component = (
    <div style={ styles.wrapper }>
      { children }
    </div>
  );

  return React.cloneElement(component, rest);

};

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};

export default Page;
