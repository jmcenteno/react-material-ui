import React from 'react';

import ResponsiveLayout from '../../../../../Global/Responsive';
import { Row, Column } from '../../../../../Global/Grid';
import ReviewList from './ReviewList';
import AddReviewForm from './ReviewForm';

function Reviews({ ...rest }) {

  const component = (
    <ResponsiveLayout
      medium={
        <Row>
          <Column span={ 12 }>
            <ReviewList />
          </Column>
          <Column span={ 12 }>
            <AddReviewForm />
          </Column>
        </Row>
      }
      large={
        <Row>
          <Column span={ 7 }>
            <ReviewList />
          </Column>
          <Column span={ 5 }>
            <AddReviewForm />
          </Column>
        </Row>
      } />
  );

  return React.cloneElement(component, rest);

}

export default Reviews;
