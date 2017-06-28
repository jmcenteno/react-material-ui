import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { CardTitle, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { createReview } from '../../../../../../../actions/productDetails';
import StarsControl from '../../../../../../Global/Controls/StarRatings';
import styles from './styles';

function mapStateToProps(state) {
  return {
    product: state.productDetails.get('product'),
    status: state.productDetails.get('reviewForm')
  };
}

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
      },
      open: false
    };

    this.setState = this.setState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);

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
      },
      open: true
    });

  }

  handleChange(e, key) {

    const { values } = this.state;
    values[key] = e.target.value;

    this.setState({ values });

  }

  closeModal() {

    this.setState({ open: false });

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

        <Dialog
          title='Review Submitted'
          actions={
            <FlatButton
              label='OK'
              onTouchTap={ this.closeModal }
            />
          }
          modal={ false }
          open={ this.state.open }
          contentStyle={ styles.modal }
          onRequestClose={ this.closeModal }>
          <p>Thank you for sharing your thoughts with us.</p>
          <p>May the Force be with you!</p>
        </Dialog>

      </Paper>
    );

  }

}

export default connect(mapStateToProps)(ReviewForm);
