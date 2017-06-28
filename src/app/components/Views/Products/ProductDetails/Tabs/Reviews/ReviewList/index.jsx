import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import { CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import moment from 'moment';

import Utils from '../../../../../../../services/utils';
import StarRatings from '../../../../StarRatings';
import styles from './styles';

function mapStateToProps(state) {
  return {
    reviews: state.productDetails.get('reviews')
  };
}

export class ReviewList extends Component {

  static propTypes = {
    reviews: PropTypes.object.isRequired
  }

  render() {

    let { reviews } = this.props;

    reviews = Utils.makeArray(reviews ? reviews.toJS() : {});

    return (
      <div>
        {
          reviews.length ?
            <List>
              {
                reviews.map((item, i) => (
                  <div key={ `review-${ i + 1 }` }>
                    { i > 0 ? <Divider inset={ true } style={ styles.divider } /> : null }
                    <ListItem
                      disabled={ true }
                      leftAvatar={ <Avatar>TU</Avatar> }
                      primaryText={ item.title }
                      secondaryText={ moment(item.created).format('M/D/YYYY') }
                      initiallyOpen={ true }
                    />
                    <CardText style={ styles.comments }>
                      <StarRatings stars={ item.stars } style={ styles.stars } />
                      { item.comments }
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

export default connect(mapStateToProps)(ReviewList);
