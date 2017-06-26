import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia } from 'material-ui/Card';
import Radium, { Style } from 'radium';

import Utils from '../../../../services/utils';
import StarRatings from '../StarRatings';
import styles from './styles';

function Product({ product, onClick, ...rest }) {

  const component = (
    <div onClick={ onClick }>
      <Style scopeSelector='.card' rules={ styles.card } />
      <Card className='card'>
        <CardMedia className='card-media'>
          <figure>
            <img
              src={ product.get('pictures').get(0) || '../assets/img/no-img.jpg' }
              alt={ product.get('name') }
              style={ styles.img }
            />
          </figure>
          <div className='overlay'>
            <div className='title'>{ product.get('name') }</div>
            <div className='subtitle'>{ Utils.formatCurrency(product.get('price')) }</div>
            <StarRatings stars={ product.get('starRatings') || 0 } className='stars' />
          </div>
        </CardMedia>
      </Card>
    </div>
  );

  return React.cloneElement(component, rest);

}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Radium(Product);
