import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import MaterialTable from 'material-table';

const Table = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily:'Poppins Regular',
  },
  overrides: {
    MuiPaper: {
      elevation2: {
        boxShadow: Array(25).fill('none'),
      },
      root:{
        backgroundColor: "transparent"
      }
    },
    MuiTableCell: {
      body: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '14px',
        textAlign: 'center !important'
      }
    },
    MuiList: {
      root: {
        backgroundColor:'#FFF'
      }
    }
  }
});

class DataMaterialTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      data:this.props.data,
    }
  }

  render() {
    const {title, data, columns, selection, onSelectionChange, type} = this.props;
    var tTheme = Table;

    return(
      <MuiThemeProvider theme={tTheme}>
        <MaterialTable
          title={title}
          columns={columns}
          data={data}
          options={{
            sorting: true,
            headerStyle: {
              color: '#737373',
              fontSize: '14px',
              textAlign: 'center'
            },
            rowStyle: {
              textAlign: 'center'
            },
            selection: selection,
            selectionProps: rowData => ({
              color: 'secondary'
            })
          }}
          onSelectionChange={(rows) => onSelectionChange(rows)}
          localization={{
            pagination: {
              labelDisplayedRows: '{from}-{to} de {count}',
              labelRowsSelect: 'Filas',
              labelRowsPerPage: 'Filas por página',
              firstAriaLabel: 'Primera página',
              firstTooltip: 'Primea página',
              previousAriaLabel: 'Página anterior',
              previousTooltip: 'Página anterior',
              nextAriaLabel: 'Página siguiente',
              nextTooltip: 'Página siguiente',
              lastAriaLabel: 'Última página',
              lastTooltip: 'Última página',
            },
            toolbar: {
              nRowsSelected: '{0} columna(s) seleccionadas',
              addRemoveColumns: 'Agrega o remueve columnas',
              searchTooltip: 'Buscar',
              searchPlaceholder: 'Buscar'
            },
            header: {
              actions: 'Acciones'
            },
            body: {
              emptyDataSourceMessage: 'Sin datos',
              filterRow: {
                filterTooltip: 'Filtro'
              },
              addTooltip: 'Agregar',
              deleteTooltip: 'Eliminar',
              editTooltip: 'Editar',
              editRow: {
                deleteText: '¿Seguro que deseas eliminar esta fila?',
                cancelTooltip: 'Cancelar',
                saveTooltip: 'Guardar'
              }
            }
          }}
        />
      </MuiThemeProvider>
    )
  }
}

export default DataMaterialTable;
