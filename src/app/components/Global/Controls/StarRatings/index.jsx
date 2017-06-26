import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import FullStarIcon from 'material-ui/svg-icons/toggle/star';
import EmptyStarIcon from 'material-ui/svg-icons/toggle/star-border';
import { amber500 } from 'material-ui/styles/colors';
import _ from 'lodash';

export default class StarRatings extends Component {

  static propTypes = {
    stars: PropTypes.number,
    className: PropTypes.string,
    color: PropTypes.string,
    label: PropTypes.string,
    containerStyle: PropTypes.object,
    onChange: PropTypes.func
  };

  static defaultProps = {
    stars: 1,
    className: '',
    color: amber500,
    label: 'Your Rating',
    containerStyle: null,
    onChange: () => {}
  };

  constructor(props) {

    super(props);

    this.state = {
      stars: this.props.stars
    };

    this.setState = this.setState.bind(this);

  }

  componentWillReceiveProps(newProps) {

    this.setState({ stars: newProps.stars });

  }

  handleOnClick(stars) {

    this.setState({ stars });
    this.props.onChange({
      target: { value: stars }
    });

  }

  render() {

    const { className, color, label, containerStyle } = this.props;
    const { stars } = this.state;

    return (
      <div className={ className } style={ containerStyle }>
        <Subheader>{ label }</Subheader>
        {
          _.times(5).map(i => {

            if (Math.floor(stars) >= (i + 1)) {
              return (
                <IconButton
                  key={ i }
                  touch={ true }
                  onTouchTap={ () => this.handleOnClick(i + 1) }>
                  <FullStarIcon color={ color } />
                </IconButton>
              );
            }

            return (
              <IconButton
                key={ i }
                touch={ true }
                onTouchTap={ () => this.handleOnClick(i + 1) }>
                <EmptyStarIcon color={ color } />
              </IconButton>
            );

          })
        }
      </div>
    );

  }

}
