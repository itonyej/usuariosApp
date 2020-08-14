import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/InfoRounded';
import AddUserIcon from '@material-ui/icons/GroupAdd';
import Button from '@material-ui/core/Button';
import axios from 'axios';


import DataMaterialTable from "../../components/commons/DataTable";
import DialogUsuarios from "./DialogUsuarios";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

class Usuarios extends Component {
  constructor() {
    super();
    this.state = {
      usuarios:[],
      skills:[],
      openDialog:false,
      dialogOption:"",
      dataUsuario:[],
      totalDatos:"10",
      apiData:[]
    }
  }

  componentDidMount() {
    this.getUsuariosData();
  }

  //CONSULTA AL BACK PARA TRAER LA INFO DE LOS USUARIOS
  getUsuariosData = () => {
    const that = this;
    const {backEndSource, getData, createNotification, closeNotification} = this.props;
    createNotification("info", "Cargando...", "bottom", "right", 1000000);

    getData(backEndSource, "usuarios/usuariosInfo.php").then(function (response) {
      if (response.data) {
        closeNotification();
        var data = response.data;
        var usuarios = data[0];
        that.setState({usuarios:usuarios});
      }
    });
  }

  //CONSUMO DE LA API DE ITUNES
  consumirApi = () => {
    const that = this;
    const {getData, backEndSource, createNotification, closeNotification} = this.props;
    const {totalDatos} = this.state;
    createNotification("info", "Consumiendo...", "bottom", "right", 1000000);

    axios.get("https://rss.itunes.apple.com/api/v1/us/apple-music/new-releases/all/"+totalDatos+"/explicit.json").then(function (res) {
      closeNotification();
      var response = res.data;
      var feed = response.feed;
      var results = feed.results;

      console.log(results);
      that.setState({apiData:results});

    });
  }

  handleOpenDialogInfo = (option, data) => {
    this.setState({dialogOption:option, dataUsuario:data}, () => {
      this.setState({openDialog:true});
    });
  }

  handleCloseDialogInfo = (option) => {
    this.setState({openDialog:false});
  }


  handleChange = name => event => {
    if(name === "totalDatos") {
      var totalDatos = event.target.value;
      totalDatos = totalDatos.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
      console.log(totalDatos);
      this.setState({[name]: totalDatos, [name + 'E']: false});
    } else {
      this.setState({[name]: event.target.value, [name + 'E']: false});
    }
  };

  render() {
    const {classes, createNotification, closeNotification, getData, backEndSource} = this.props;
    const {usuarios, openDialog, skills, dialogOption, dataUsuario, totalDatos, apiData} = this.state;

    return(
      <div className={classes.root}>
        <Grid container style={{width:'100%', padding:'20px'}}>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" className={classes.button} style={{float: 'right', marginRight:'40px'}} onClick={()=>this.handleOpenDialogInfo("crear")}>
              Agregar Usuario
              <AddUserIcon className={classes.rightIcon}/>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <DataMaterialTable
              title={"Usuarios"}
              data={usuarios}
              columns={[
                {
                  title: 'ID',
                  field: 'areaId',
                  editable: 'never',
                  hidden:true
                },
                {
                  title: 'Info',
                  field: 'id',
                  ellStyle: {textAlign: 'center'},
                  sorting:false,
                  render: rowData => {
                    return(<IconButton aria-label="Abrir" onClick={()=>this.handleOpenDialogInfo("abrir",rowData)}>
                      <InfoIcon/>
                    </IconButton>)
                  },
                },
                { title: 'Nombre', field: 'nombre', cellStyle: {textAlign: 'center'}},
                { title: 'Apellidos', field: 'apellidos', cellStyle: {textAlign: 'center'}},
                { title: 'Dirección', field: 'direccion', cellStyle: {textAlign: 'center'}},
                { title: 'Pais', field: 'pais', cellStyle: {textAlign: 'center'}},
                { title: 'CP', field: 'cp', cellStyle: {textAlign: 'center'}},
                { title: 'Estudios', field: 'estudios', cellStyle: {textAlign: 'center'}},
              ]}
            />
          </Grid>
        </Grid>
        <Grid container style={{width:'100%', padding:'20px'}}>
          <Grid item xs={12}>
            <h2>Consumo de API Apple Music</h2>
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="apellidos"
              label="Total de datos"
              variant="outlined"
              value={totalDatos}
              onChange={this.handleChange('totalDatos')}
              style={{width:'100%'}}
            />
          </Grid>
          <Grid item xs={8}>
            <Button onClick={() => this.consumirApi()} color="primary">
              Consumir
            </Button>
          </Grid>
        </Grid>
        <Grid container style={{width:'100%', padding:'20px'}}>
          <Grid item xs={12}>
            <h1>Total de artistas: {Object.keys(apiData).length}</h1>
          </Grid>
          {apiData.map(function (arr, index) {
            return(
            <Grid item xs={2} style={{textAlign:'center'}}>
              <a style={{cursor:'pointer'}} href={arr.artistUrl} target="_blank">
                <img src={arr.artworkUrl100} style={{borderRadius:8, marginTop:'20px'}}/>
              </a>
              <h2>{arr.artistName}</h2>
              <h4>{arr.name}</h4>
            </Grid>
            )
          })}
        </Grid>
        <DialogUsuarios
          dataUsuario={dataUsuario}
          dialogOption={dialogOption}
          open={openDialog}
          handleClose={this.handleCloseDialogInfo}
          skills={skills}
          createNotification={createNotification}
          closeNotification={closeNotification}
          getData={getData}
          backEndSource={backEndSource}
          getUsuariosData={this.getUsuariosData}
        />
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

Usuarios.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Usuarios);
