import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles, Chip, Avatar } from "@material-ui/core";
import { useState, useEffect } from "react";
import { helpHttp } from './helpFetch';
import { CustomButton } from "./DialogButtons";
import {useNavigate} from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';


const useStyles = makeStyles(() => ({
  tablaContainer: {
    display: "flex", 
    height: "310px", 
    width: "820px"
  },
  tabla: {
    display:'flex',
    height: "100%",
    maxWidth: '820px',
    "& .MuiDataGrid-columnsContainer": {
        backgroundColor: '#FFCF57',
        minHeight: '40px !important',
        height: '40px',
        marginTop: '7px'
    },
    "& .MuiDataGrid-window":{top: '47px !important'},
    "& .MuiDataGrid-columnSeparator":{display:'none'},
    "& .MuiSvgIcon-root":{color:'black'}
  },
  GTbC:{
    display: "flex",
    justifyContent: "space-between",//"flex-end",
    marginRight: "10px", 
  },
  delIcon:{marginLeft:'9px'},
  delSpan:{
    position: 'relative',
    marginRight: '20px',
    top: '0.2em', left: '0.5em',
  },
  flex:{display:'flex'},
  pointer:{cursor:'pointer', display:'flex'},
  red:{}
}));

export default function Tabla() {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(3)
    const [select, setSelect] = useState([])
    const [filter, setFilter] =useState({})
    const [row, setRow] = useState([]);
    const classes = useStyles();

    let api = helpHttp();

    const columns = [
        // { field: "id", headerName: "ID", width: 70 },
        { field: "img", headerName: "Img", width: 90,
          renderCell: (params) => {
            return <Avatar>{params.value?params.value.charAt(0):<PersonIcon />}</Avatar>
          }
        },
        { field: "code", headerName: "Codigo", width: 105 },
        // { field: "externalCode", headerName: "Cod_externo", width: 115, sortable: false },
        { field: "name", headerName: "Nombre", width: 100, sortable: false },
        { field: "tags", headerName: "Tags", width: 90,
          renderCell: (params) => { let i = 0
            return ( params.value?.map((data) => i++<2?<Chip 
                      variant="outlined" size="small" label={data.name} 
                      style={{color: data.color, borderColor:data.color}}/>:''
                      )  
                    )
          } //solo carga al cambiar algo un segundo ¿whytF?
        },
        { field: "material", headerNAme: "Material", width: 165, sortable: false,
          renderCell: (params) => { 
            return ( 
              params.value?.map((data) => 
                <Chip variant="outlined" size="small" label={data}/>
              )
            )
          } 
        },
        { field: "description", headerName: "Descripción", width: 110, sortable: false },
        { field: "measureUnit", headerName: "Medida", width: 105, type:'number'},
    ];
    
    
    console.log(data)
    const rows = data?.content?.map((row) => ({
        id: row.id,
        img: row.imageUuid,
        code: row.code,
        name: row.name,
        tags: row.tags,
        material: [
            row.isRawMaterial?'Raw':'',
            row.isVirtual?'Virtual':'',
            row.isSemifinished?'Semifinished':'',
            row.isFinished?'Finished':''
        ].filter(v => v!==''),//.join(' ') 
        externalCode: row.externalCode,
        description: row.description,
        measureUnit: row.measureUnitId,
        observaciones: row.observations,
    }));
    
    const delProcedures = (ids) => { 
        let done=true;
        ids.forEach(idp => {
          api.delMaterials(idp)
            .then((resp) => {
              if(resp.ok) done=false
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        if(done){
          alert('Procedures deleted successfully');
          api.getMaterials(page, pageSize)
            .then((res)=>{
              setData(res)
            })
        }
    };

    function CustomToolbar() {
        return (
          <GridToolbarContainer className={classes.GTbC}>
            <div className={classes.pointer}
            onClick={() =>{delProcedures(select)}}>
              <DeleteIcon className={classes.delIcon}/> 
              <span className={classes.delSpan}>
                Delete Selected {select.length}
              </span>
            </div> 
            <div className={classes.flex}>
              <CustomButton filter reloadInf={{
                page:page, pageSize:pageSize, 
                setData:setData, 
                setFilter:setFilter
              }}/>
              <CustomButton add reloadInf={{
                page:page, pageSize:pageSize, 
                setData:setData
              }}/>
            </div>
          </GridToolbarContainer>
        );
    }
    
    useEffect(() => {
        api.getMaterials(page, pageSize, filter)
        .then((resm) => {
            resm.content.forEach((r)=>{
              api.getTags(r.id).then((res) => {
                r.tags=res
              })
            })
            setData(resm);
        });
      }, [pageSize, page, filter]);

    return (
        <div className={classes.tablaContainer}>
          <DataGrid 
            rows={rows ?? []} 
            columns={columns}
            page={page}
            rowCount={data?.totalElements}
            onPageChange={(newPage) => setPage(newPage)}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[3, 6, 9]}
            pagination
            paginationMode="server"
            disableColumnMenu={true}
            components={{Toolbar: CustomToolbar}}
            className={classes.tabla}
            checkboxSelection
            disableColumnFilter={true}
            disableSelectionOnClick={true}
            onRowClick={(inf) => {
              setRow(data.content.find((row) => row.id === inf.id)); 
            }}
            onSelectionModelChange={(inf) => {setSelect(inf)}}
          />
          {row.id && navigate(`/materials/${row.id}`, { state:{row}, replace:true })}
        </div>
      );
}