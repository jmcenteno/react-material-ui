import React from 'react';
import PropTypes from 'prop-types';

import ResponsiveLayout from '../../../../../Global/Responsive';
import { Row, Column } from '../../../../../Global/Grid';
import ReviewList from './ReviewList';
import AddReviewForm from './ReviewForm';

function Reviews({ product, ...rest }) {

  const component = (
    <ResponsiveLayout
      medium={
        <Row>
          <Column span={ 12 }>
            <ReviewList data={ product.get('reviews') } />
          </Column>
          <Column span={ 12 }>
            <AddReviewForm product={ product } />
          </Column>
        </Row>
      }
      large={
        <Row>
          <Column span={ 7 }>
            <ReviewList data={ product.get('reviews') } />
          </Column>
          <Column span={ 5 }>
            <AddReviewForm product={ product } />
          </Column>
        </Row>
      } />
  );

  return React.cloneElement(component, rest);

}

Reviews.propTypes = {
  product: PropTypes.object.isRequired
};

export default Reviews;
