import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import Radium from 'radium';

import { breakpoints } from '../../../../../theme';
import Product from '../Product';
import styles from './styles';

class ProductGrid extends Component {

  static propTypes = {
    products: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  }

  constructor() {

    super();

    this.state = {
      cols: 3
    };

  }

  componentDidMount() {

    window.onresize = () => {
      this.setColumns(window.innerWidth);
    };

    this.setColumns(window.innerWidth);

  }

  setColumns(width) {

    let cols = 3;

    if (width <= breakpoints.sm) {
      cols = 1;
    } else if (width <= breakpoints.md) {
      cols = 2;
    }

    this.setState({ columns: cols });

  }

  render() {

    const { products, pushState } = this.props;

    return (
      <GridList
        className='product-grid'
        cols={ this.state.columns }
        cellHeight='auto'
        padding={ 32 }>
        {
          products.map((item, i) => {

            const routePath = `/products/${ item.get('category') }/${ item.get('slug') }`;

            return (
              <GridTile key={ i } style={ styles.gridTile }>
                <Product
                  product={ item }
                  onClick={ () => pushState(routePath) }
                />
              </GridTile>
            );
          })
        }
      </GridList>
    );

  }

}

export default Radium(ProductGrid);
