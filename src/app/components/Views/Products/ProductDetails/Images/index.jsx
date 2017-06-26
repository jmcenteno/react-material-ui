import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Column } from '../../../../Global/Grid';
import Thumbnail from './Thumbnail';

const styles = {
  currentImage: {
    width: '100%'
  }
};

export default class ImageViewer extends Component {

  static propTypes = {
    images: PropTypes.object.isRequired
  }

  constructor(props) {

    super(props);

    this.state = {
      current: 0
    };

  }

  setCurrent(index) {

    this.setState({
      current: index
    });

  }

  render() {

    const { images } = this.props;

    const thumbnails = (
      images.size ?
        images.map((img, i) => {
          const active = (this.state.current === i);
          return (
            <Thumbnail
              key={ i } 
              src={ img } 
              active={ active } 
              onClick={ () => this.setCurrent(i) } />
          );
        }) :
        <Thumbnail active={ true } />
    );

    return (
      <Row>
        <Column span={ 2 }>{ thumbnails }</Column>
        <Column span={ 10 }>
          <img
            src={ images.get(this.state.current) || '../assets/img/no-img.jpg' }
            alt=''
            style={ styles.currentImage } />
        </Column>
      </Row>
    );

  }

}
