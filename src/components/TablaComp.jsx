import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import { helpHttp } from './helpFetch';
import AddDialogButton from "./AddComp";
import { useLocation } from "react-router-dom";
import ActionsRow from './ActionsCell'



const useStyles = makeStyles(() => ({
  tablaContainer: {
    display: "flex", 
    height: "300px", 
    width: "325px"
  },
  tabla: {
    display:'flex',
    height: "100%",
    "& .MuiDataGrid-columnsContainer": {
        backgroundColor: '#FFCF57',
        minHeight: '40px !important',
        height: '40px',
        marginTop: '7px'
    },
    "& .MuiDataGrid-window":{top: '47px !important'},
    "& .MuiDataGrid-columnSeparator":{display:'none'},
    "& .MuiDataGrid-columnHeader":{minWidth:'0!important',},
    "& .MuiDataGrid-columnHeaderTitleContainer":{padding:'0'}
  },
  addB:{
    display:'flex', 
    position: 'relative',
    top: '255px',
    left:'5px',
    cursor:'pointer'
},
}));

export default function Tabla() {
    const { state } = useLocation();
    const [data, setData] = useState([])
    const [page, setPage] = useState(0)
    const [load, reload] = useState()
    const classes = useStyles();

    let api = helpHttp();
    
    const columns = [
        { field: "id", headerName: "ID", width: 50, sortable: false },
        { 
            field: "compositionOrder", 
            headerName: "Order", 
            width: 75, sortable: false,
            align:'center',
            headerAlign: "right" },
        { 
            field: "units", 
            headerName: "unidades", 
            width: 95, sortable: false, 
            align:'center',
            headerAlign: "right"
        },
        {
            field: "actions",
            headerName: "Actions",
            renderCell: ActionsRow,
            sortable: false,
            width: 85,
            headerAlign: "center",
            filterable: false,
            disableColumnMenu: true,
            disableReorder: true
          },
        // { field: "isPercentage", headerName: "porcentaje", width: 125 },
    ];
    
    const rows = data.map((row) => ({
      compositionOrder : row.compositionOrder,
      measureUnitId: row.measureUnitId,
      isPercentage: row.isPercentage,
      id : row.componentId,
      units: row.units,
      idm: state.row.id,
      reload: reload,
      data: data,
    }));

    function CustomToolbar() {
        return (
          <GridToolbarContainer >
            <div className={classes.addB}>
              <AddDialogButton setData={setData} prev={data} idM={state.row.id}/>
            </div>
            <div style={{marginBottom:'-7px'}}>
              <b>Componentes del Material {state.row.id}</b>
            </div>
          </GridToolbarContainer>
        );
    }
    
    useEffect(() => {
        api.getComp(state.row.id)
        .then((res) => {
            setData(res);
        });
      }, [load]);

    const handleClose=()=>{
      setOpen(false)
    }
    
    return (
        <div className={classes.tablaContainer}>
          <DataGrid 
            rows={rows ?? []} 
            columns={columns}
            page={page}
            rowCount={data?.totalElements}
            onPageChange={(newPage) => setPage(newPage)}
            pagination
            rowsPerPageOptions={[3, 6, 9]}//should be disabled

            paginationMode="server"
            disableColumnMenu={true}
            components={{Toolbar: CustomToolbar}}
            className={classes.tabla}
            disableSelectionOnClick
          />
        </div>
    );
}