import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { CardTitle, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { createReview } from '../../../../../../../actions/reviews';
import StarsControl from '../../../../../../Global/Controls/StarRatings';
import styles from './styles';

export class ReviewForm extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor() {

    super();

    this.state = {
      values: {
        title: '',
        stars: 1,
        comments: ''
      }
    };

    this.setState = this.setState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(e) {

    e.preventDefault();

    const { dispatch, product } = this.props;
    const { values } = this.state;
    const review = Object.assign({}, values, {
      created: new Date()
    });

    dispatch(createReview(product.get('key'), review));

    this.setState({
      values: {
        title: '',
        stars: 1,
        comments: ''
      }
    });

  }

  handleChange(e, key) {

    const { values } = this.state;
    values[key] = e.target.value;

    this.setState({ values });

  }

  render() {

    const { values } = this.state;

    return (
      <Paper style={ styles.root }>
        <ValidatorForm onSubmit={ this.handleSubmit } autoComplete={ false }>
          <CardTitle title='Add a Review' subtitle='Share your thoughts about this product' />
          <CardText>
            <StarsControl
              ref={ (element) => this.stars = element }
              stars={ values.stars }
              containerStyle={ styles.stars }
              onChange={ (e) => this.handleChange(e, 'stars') }
              autoComplete={ false }
            />
            <TextValidator
              floatingLabelText='Title'
              hintText='Title'
              name='title'
              value={ values.title }
              onChange={ (e) => this.handleChange(e, 'title') }
              validators={['required']}
              errorMessages={['This field is required']}
              fullWidth={ true }
            />
            <TextValidator
              floatingLabelText='Your Comments'
              hintText='Your Comments'
              name='comments'
              value={ values.comments }
              onChange={ (e) => this.handleChange(e, 'comments') }
              validators={['required']}
              errorMessages={['This field is required']}
              fullWidth={ true }
              multiLine={ true }
              rowsMax={ 4 }
            />
          </CardText>
          <CardActions>
            <RaisedButton type='submit' label='Submit Review' primary={ true } />
          </CardActions>
        </ValidatorForm>
      </Paper>
    );

  }

}

export default connect(state => ({
  status: state.productDetails.get('reviewForm')
}))(ReviewForm);
