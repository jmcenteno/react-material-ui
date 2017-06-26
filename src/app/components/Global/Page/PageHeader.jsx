import React from 'react';
import { CardTitle } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

const styles = {
  divider: {
    marginBottom: 32
  }
};

export default ({ title, subtitle, ...rest }) => {

  const component = (
    <header>
      <CardTitle title={ title } subtitle={ subtitle } />
      <Divider style={ styles.divider } />
    </header>
  );
  
  return React.cloneElement(component, rest);

};
