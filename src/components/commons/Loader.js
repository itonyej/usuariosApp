import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: '0px',
    marginRight: '10px',
    color: '#00bcd4 !important',
    width:'30px',
    height: '30px'
  },
});

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="text-center">
        <CircularProgress className={classes.progress} />
      </div>
    );
  }
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);
