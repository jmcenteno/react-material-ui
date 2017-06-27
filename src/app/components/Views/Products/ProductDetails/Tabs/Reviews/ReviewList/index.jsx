import React from 'react';
import PropTypes from 'prop-types';
import { List as ImmutableList } from 'immutable';
import { List, ListItem } from 'material-ui/List';
import { CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import moment from 'moment';

import StarRatings from '../../../../StarRatings';
import styles from './styles';

function ReviewList({ reviews }) {

  return (
    <div>
      {
        reviews.size ?
          <List>
            {
              reviews.map((item, i) => (
                <div key={ `review-${ i + 1 }` }>
                  { i > 0 ? <Divider inset={ true } /> : null }
                  <ListItem
                    disabled={ true }
                    leftAvatar={ <Avatar>TU</Avatar> }
                    primaryText={ item.get('title') }
                    secondaryText={ moment(item.get('created')).format('M/D/YYYY') }
                    initiallyOpen={ true }
                  />
                  <CardText style={ styles.comments }>
                    <StarRatings stars={ item.get('stars') } style={ styles.stars } />
                    { item.get('comments') }
                  </CardText>
                </div>
              ))
            }
          </List> :
          <CardText>
            <p>There are no reviews for this product</p>
          </CardText>
      }
    </div>
  );

}

ReviewList.propTypes = {
  reviews: PropTypes.object
};

ReviewList.defaultProps = {
  reviews: ImmutableList()
};

export default ReviewList;
