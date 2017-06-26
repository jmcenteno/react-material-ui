import React from 'react';
import PropTypes from 'prop-types';
import { CardText } from 'material-ui/Card';

import ResponsiveLayout from '../../../../../Global/Responsive';
import { Row, Column } from '../../../../../Global/Grid';
import Specs from './Specs';

const styles = {
  description: {
    fontSize: 16,
    fontWeight: 300,
    lineHeight: 1.5
  }
};

function DescriptionTab({ product, ...rest }) {

  const description = (
    <CardText style={ styles.description }>
      <p>{ product.get('description') }</p>
    </CardText>
  );

  const specs = (
    <Specs data={ product.get('specs') } />
  );

  const component = (
    <ResponsiveLayout
      medium={
        <div>
          <Row>
            <Column span={ 12 }>{ description }</Column>
          </Row>
          <Row>
            <Column span={ 12 }>{ specs }</Column>
          </Row>
        </div>
      }
      large={
        <Row>
          <Column span={ 7 }>{ description }</Column>
          <Column span={ 5 }>{ specs }</Column>
        </Row>
      } />
  );

  return React.cloneElement(component, ...rest);

}

DescriptionTab.propTypes = {
  product: PropTypes.object.isRequired
};

export default DescriptionTab;
