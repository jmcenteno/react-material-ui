import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import { CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import moment from 'moment';

import StarRatings from '../../../../StarRatings';
import styles from './styles';

export class ReviewList extends Component {

  static propTypes = {
    reviews: PropTypes.object.isRequired
  }

  render() {

    const { reviews } = this.props;

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

}

export default connect(state => ({
  reviews: state.reviews.get('data')
}))(ReviewList);
