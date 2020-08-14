/*Componentes globales*/
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/index';
import Loader from "./Loader";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: "#43a047 !important",
    padding: '6px 16px !important'
  },
  error: {
    backgroundColor: "#b71c1c !important",
    padding: '6px 16px !important'
  },
  info: {
    backgroundColor: "#656a70 !important",
    padding: '6px 16px !important'
  },
  warning: {
    backgroundColor: "#ffa000 !important",
    padding: '6px 16px !important'
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  var img = "";
  var msg = message;
  var icon = <Icon className={classNames(classes.icon, classes.iconVariant)} />;
  var iconClose = [
    <IconButton
      key="close"
      aria-label="Close"
      color="inherit"
      className={classes.close}
      onClick={onClose}
    >
      <CloseIcon className={classes.icon} />
    </IconButton>,
  ]

  if(variant === "info"){
    icon = "";
    img = <Loader/>
    msg = <span className="m-l-10">{message}</span>;
    iconClose = [];
  }

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          {icon}
          {img}
          {msg}
        </span>
      }
      action={iconClose}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class Notificaciones extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { vertical, horizontal, mostrarNotificacion, cerrarNotificacion, tipo, msg, duration} = this.props;
    /*success, warning, info, error*/
    return (
      <Snackbar
        anchorOrigin={{
          vertical: vertical,
          horizontal: horizontal,
        }}
        open={mostrarNotificacion}
        autoHideDuration={duration}
        onClose={cerrarNotificacion}
        style={{zIndex:'10000'}}
      >
        <MySnackbarContentWrapper
          onClose={cerrarNotificacion}
          variant={tipo}
          message={msg}
        />
      </Snackbar>
    );
  }
}

Notificaciones.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles2)(Notificaciones);
