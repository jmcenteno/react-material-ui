import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

import { colors } from '../../../../../../theme';

const styles = {
  a: {
    default: {
      cursor: 'pointer',
      display: 'block',
      marginBottom: 8
    },
    active: {
      border: `solid 3px ${ colors.primary }`
    }
  },
  img: {
    display: 'block',
    maxWidth: '100%',
    height: 'auto'
  }
};

styles.a.active = Object.assign({}, styles.a.default, styles.a.active);

const Thumbnail = ({ src, onClick, active, ...rest }) => {

  const component = (
    <Paper zDepth={ active ? 1 : 3 }>
      <a onClick={ onClick } style={ active ? styles.a.active : styles.a.default }>
        <img src={ src } alt='' style={ styles.img } />
      </a>
    </Paper>
  );

  return React.cloneElement(component, rest);

};

Thumbnail.propTypes = {
  src: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool
};

Thumbnail.defaultProps = {
  src: '../assets/img/no-img.jpg',
  active: false
};

export default Thumbnail;
