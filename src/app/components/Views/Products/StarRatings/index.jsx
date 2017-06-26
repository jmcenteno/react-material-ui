import React from 'react';
import PropTypes from 'prop-types';
import FullStarIcon from 'material-ui/svg-icons/toggle/star';
import EmptyStarIcon from 'material-ui/svg-icons/toggle/star-border';
import { amber500 } from 'material-ui/styles/colors';
import _ from 'lodash';

import styles from './styles';

function StarRatings({ stars, className, color, showLabel, ...rest }) {

  const component = (
    <div className={ className } style={ styles.root }>
      {
        showLabel ?
          <div style={ styles.label }>Ratings</div> :
          null
      }
      <div>
        {
          _.times(5).map(i => {

            if (Math.floor(stars) >= (i + 1)) {
              return (
                <FullStarIcon key={ i } color={ color } />
              );
            }

            return (
              <EmptyStarIcon key={ i } color={ color } />
            );

          })
        }
      </div>
    </div>
  );

  return React.cloneElement(component, rest);

}

StarRatings.propTypes = {
  stars: PropTypes.number,
  className: PropTypes.string,
  color: PropTypes.string,
  showLabel: PropTypes.bool
};

StarRatings.defaultProps = {
  stars: 0,
  color: amber500,
  showLabel: false
};

export default StarRatings;
