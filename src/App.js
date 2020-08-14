import React from 'react';
import axios from 'axios';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { curi } from '@curi/router';
import Browser from '@hickory/browser';
import { curiProvider } from "@curi/react-dom";
import logo from './logo.svg';
import './App.css';

import routes from './routes';
import Header from "./components/commons/Header";
import Notificaciones from "./components/commons/Notificaciones";
const history = Browser();
const router = curi(history, routes);
const Router = curiProvider(router);

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily:'Poppins Regular',
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: 'rgba(0,0,0,0.4)',
        },
        "&$focused $notchedOutline": {
          borderColor: '#0345ea'
        }
      },
      disabled: {
        backgroundColor: '#eee',
        borderRadius: '5px'
      }
    },
    MuiFormControlLabel: {
      label: {
        color: '#737373'
      }
    },
    MuiCheckbox: {
      checked: {
        color: '#0345ea !important'
      }
    },
    MuiInputLabel: {
      shrink: {
        background: "#fff !important"
      }
    },
    MuiButton: {
      root:{
        borderRadius:'20px'
      },
      containedPrimary: {
        backgroundColor: '#0345ea',
        '&:hover': {
          backgroundColor: '#1a49bf',
        }
      }
    }
  }
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      backEndSource: "http://registro.cloudgia.com/backEnd/",
      page:"usuarios",
      showNotification: false,
      notificationType: "info",
      notificationMsg: "process",
      notificationVertical: "top",
      notificationHorizontal: "right",
      notificationDuration: 3000,
    }
  }

  componentDidMount() {
    router.navigate({name: "usuarios"});
  }

  //CONEXION
  getData = (backEndSource, url, data) => {
    const res = axios.post(backEndSource + url, data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
    });
    return res;
  }

  //NOTIFICACIONES
  closeNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({showNotification: false, notificationDuration:3000}, ()=> {
      return true;
    });
  }

  createNotification = (type, msg, vertical, horizontal, duration) => {
    /*success, warning, info, error*/
    var time = duration !== undefined ? duration : 3000;
    this.setState({notificationDuration:time, notificationType: type, notificationMsg: msg, notificationVertical: vertical, notificationHorizontal: horizontal, showNotification: true}, ()=>{
      return true;
    });
  }

  render() {
    const {backEndSource, showNotification, notificationType, notificationMsg, notificationVertical, notificationHorizontal, notificationDuration} = this.state;

    return(
      <div>
        <Header/>
        <MuiThemeProvider theme={theme}>
          <Router>
            {({response, router}) => {
              const {body: Body} = response;
              return (
                <Body
                  backEndSource={backEndSource}
                  closeNotification={this.closeNotification}
                  createNotification={this.createNotification}
                  getData={this.getData}
                />
              );
            }}
          </Router>
        </MuiThemeProvider>
        <Notificaciones
          mostrarNotificacion={showNotification}
          cerrarNotificacion={this.closeNotification}
          tipo={notificationType}
          msg={notificationMsg}
          vertical={notificationVertical}
          horizontal={notificationHorizontal}
          duration={notificationDuration}
        />
      </div>
    )
  }
}

export default App;
