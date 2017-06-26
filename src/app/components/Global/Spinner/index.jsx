import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import styles from './styles';

const Spinner = ({ ...rest }) => {

  const component = (
    <div style={ styles }>
      <CircularProgress { ...rest } />
    </div>
  );

  return React.cloneElement(component);

};

export default Spinner;
