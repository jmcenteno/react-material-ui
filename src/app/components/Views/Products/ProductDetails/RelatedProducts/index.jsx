import React from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import { CardTitle, CardText } from 'material-ui/Card';

import Product from '../../Product';
import styles from './styles';

function RelatedProducts({ products, pushState, ...rest }) {

  const component = (
    <div>
      <CardTitle title='Related Products' />
      <CardText>
        <div style={ styles.root }>
          <GridList style={ styles.gridList } padding={ 16 } cellHeight='auto' cols={ 4 }>
            {
              products.map((item, i) => {

                const routePath = `/products/${ item.get('category') }/${ item.get('slug') }`;

                return (
                  <GridTile
                    key={ `related-product-${ i + 1 }` }
                    style={ styles.gridTile }>
                    <Product product={ item } onClick={ () => pushState(routePath) } />
                  </GridTile>
                );

              })
            }
          </GridList>
        </div>
      </CardText>
    </div>
  );

  return React.cloneElement(component, rest);

}

RelatedProducts.propTypes = {
  products: PropTypes.object.isRequired,
  pushState: PropTypes.func.isRequired
};

export default RelatedProducts;
