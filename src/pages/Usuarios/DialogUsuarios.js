import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';
import InputAdornment from '@material-ui/core/InputAdornment';
import EventIcon from '@material-ui/icons/Event';
import CakeIcon from '@material-ui/icons/Cake';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import axios from "axios";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class DialogUsuarios extends React.Component {
  constructor() {
    super();
    this.state = {
      nombre:"",
      nombreE:false,
      apellidos:"",
      apellidosE:false,
      direccion:"",
      direccionE:false,
      pais:"",
      paisE:false,
      cp:"",
      cpE:false,
      estudios:"",
      estudiosE:false,
      disable:false,
      editar:false,
      dialogOption:"",
      userId:""
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {open, dataUsuario, dialogOption} = this.props;
    if(nextProps.open !== open) {
      if(dialogOption === "abrir") {
        this.setState({disable:true, nombre:dataUsuario.nombre, apellidos:dataUsuario.apellidos, direccion:dataUsuario.direccion, pais:dataUsuario.pais, cp:dataUsuario.cp, estudios:dataUsuario.estudios, dialogOption:"", userId:dataUsuario.id});
      } else {
        this.setState({disable:false, nombre:"", apellidos:"", direccion:"", pais:"", cp:"", estudios:"", dialogOption:"abrir", userId:""});
      }
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value, [name+'E']:false },()=> {});
  }

  handleValidateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  handleEditar = (option) => {
    this.setState({editar:option}, () => {
      this.setState({disable:!option});
    });
  }

  handleClose = () => {
    const {handleClose} = this.props;
    this.setState({editar:false}, () => {
      handleClose();
    })
  }

  saveData = (option) => {
    const that = this;
    const {backEndSource, getData, createNotification, closeNotification, getUsuariosData} = this.props;
    const {nombre, apellidos, direccion, pais, cp, estudios, userId} = this.state;
    var editar = option === "editar" ? 1 : 0;

    if(nombre === "") {
      this.setState({nombreE:true}, ()=> {
        createNotification("error", "Ingresa el nombre del usuario.", "bottom", "right");
      });
    } else if(apellidos === "") {
      this.setState({apellidosE:true}, ()=> {
        createNotification("error", "Ingresa los apellidos.", "bottom", "right");
      });
    } else if(direccion === "") {
      this.setState({direccionE:true}, ()=> {
        createNotification("error", "Ingresa una dirección.", "bottom", "right");
      });
    } else if(pais === "") {
      this.setState({paisE:true}, ()=> {
        createNotification("error", "Ingresa el pais.", "bottom", "right");
      });
    } else if(cp === "") {
      this.setState({cpE:true}, ()=> {
        createNotification("error", "Ingresa un codigo postal.", "bottom", "right");
      });
    } else if(estudios === "") {
      this.setState({estudiosE:true}, ()=> {
        createNotification("error", "Ingresa los estudios.", "bottom", "right");
      });
    }  else {
      if(editar === true) {
        createNotification("info", "Guardando...", "bottom", "right", 1000000);
      } else {
        createNotification("info", "Editando...", "bottom", "right", 1000000);
      }

      getData(backEndSource, "usuarios/createUsuario.php",{
        nombre:nombre,
        apellidos:apellidos,
        direccion:direccion,
        pais:pais,
        cp:cp,
        estudios:estudios,
        editar:editar,
        userId:userId
      }).then(function (response) {
        if (response.data) {
          closeNotification();
          var data = response.data;

          if(data[0].error === 1) {
            if(editar === true) {
              createNotification("success", "Usuario agregado con exito.", "bottom", "right", 3000);
            } else {
              createNotification("success", "Usuario editado con exito.", "bottom", "right", 3000);
            }
            setTimeout(function () {
              that.setState({nombre:"", apellidos:"", direccion:"", pais:"", cp:"", estudios:""});
              that.handleClose();
              getUsuariosData();
            }, 800);
          } else {
            if(editar === true) {
              createNotification("error", "Hubo un problema al intentar crear el usuario " + data[0].error, "bottom", "right", 3000);
            } else {
              createNotification("error", "Hubo un problema al intentar editar el usuario " + data[0].error, "bottom", "right", 3000);
            }
          }
        }
      });
    }
  }

  deleteUser = () => {
    const that = this;
    const {backEndSource, getData, createNotification, closeNotification, getUsuariosData} = this.props;
    const {nombre, apellidos, direccion, pais, cp, estudios, userId} = this.state;

    createNotification("info", "Eliminando...", "bottom", "right", 1000000);

    getData(backEndSource, "usuarios/deleteUser.php",{
      userId:userId,
    }).then(function (response) {
      if (response.data) {
        closeNotification();
        var data = response.data;

        if(data[0].error === 1) {
          createNotification("success", "Usuario eliminado con exito.", "bottom", "right", 3000);
          setTimeout(function () {
            that.handleClose();
            getUsuariosData();
          }, 800);
        } else {
          createNotification("error", "Hubo un problema al intentar eliminar el usuario " + data[0].error, "bottom", "right", 3000);
        }
      }
    });
  }

  render() {
    const {open, skills, classes} = this.props;
    const {nombre, nombreE, apellidos, apellidosE, direccion, direccionE, pais, paisE, cp, cpE, estudios, estudiosE, disable, editar, dialogOption} = this.state;

    return(
      <Dialog
        maxWidth="md"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
          {dialogOption === "abrir" ? "Usuario" : "Editar Usuario"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1} style={{width:'100%', padding:'5px'}}>
            <Grid item xs={6}>
              <TextField
                disabled={disable}
                error={nombreE}
                id="nombre"
                label="Nombre"
                variant="outlined"
                value={nombre}
                onChange={this.handleChange('nombre')}
                style={{width:'100%'}}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled={disable}
                error={apellidosE}
                id="apellidos"
                label="Apellidos"
                variant="outlined"
                value={apellidos}
                onChange={this.handleChange('apellidos')}
                style={{width:'100%'}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={disable}
                error={direccionE}
                id="direccion"
                label="Dirección"
                variant="outlined"
                value={direccion}
                onChange={this.handleChange('direccion')}
                style={{width:'100%', marginTop:'10px'}}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled={disable}
                id="pais"
                label="Pais"
                variant="outlined"
                value={pais}
                error={paisE}
                onChange={this.handleChange('pais')}
                style={{width:'100%', marginTop:'10px'}}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled={disable}
                id="cp"
                label="Codigo postal"
                variant="outlined"
                value={cp}
                error={cpE}
                onChange={this.handleChange('cp')}
                style={{width:'100%', marginTop:'10px'}}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled={disable}
                id="estudios"
                label="Grado de estudios"
                variant="outlined"
                value={estudios}
                error={estudiosE}
                onChange={this.handleChange('estudios')}
                style={{width:'100%', marginTop:'10px'}}
              />
            </Grid>
          </Grid>
        </DialogContent>
        {dialogOption === "abrir" &&
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => this.saveData()} color="primary">
              Guardar
            </Button>
          </DialogActions>
        }
        {(dialogOption === "" && editar === false) &&
        <DialogActions>
          <Button onClick={() => this.handleEditar(true)} color="primary">
            Editar
          </Button>
          <Button onClick={() => this.deleteUser(true)} color="secondary">
            Borrar
          </Button>
        </DialogActions>
        }
        {editar === true &&
        <DialogActions>
          <Button onClick={() => this.handleEditar(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => this.saveData("editar")} color="primary">
            Guardar
          </Button>
        </DialogActions>
        }
      </Dialog>
    )
  }
}

DialogUsuarios.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DialogUsuarios);
