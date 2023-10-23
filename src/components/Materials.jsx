import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import {TextField, MenuItem, Button, Select, Input, 
        List, Chip, InputLabel} from "@material-ui/core";
import { helpHttp } from './helpFetch';
import { useState } from "react";

const names = [
  'Raw',
  'Virtual',
  'Finished',
  'Semifinished',
];
const useStyles = makeStyles(() => ({
    textField: {
        margin: '10px 0'
    },
    mMenos: {
        margin: '-25px 0 10px'
    },
    b0:{margin:'0 10px'},
    b1:{
      borderRadius:'10px', 
      backgroundColor:'#FFCF57',
      padding:'0 20px'
    }
}))

export default function Materials(){
    const { state } = useLocation();
    const [edit, setEdit] = useState(false);
    const [codigo, setCodigo] = useState(state.row.code);
    const [extCod, setExtCod] = useState(state.row.externalCode);
    const [medida, setMedida] = useState(state.row.measureUnitId);
    const [name, setName] = useState(state.row.name);
    const [desc, setDesc] = useState(state.row.description);
    const [obs, setObs] = useState(state.row.observations);
    const [tipo, setTipo] = useState([
      state.row.isRawMaterial?'Raw':'',
      state.row.isVirtual?'Virtual':'',
      state.row.isSemifinished?'Semifinished':'',
      state.row.isFinished?'Finished':''
      ].filter(material => material != ''));    
      const classes = useStyles();
    let api = helpHttp();

    function update(){
      api.putMaterials({
        ...state.row,
        code: codigo, 
        externalCode: extCod, 
        measureUnitId: medida, 
        name: name, 
        description: desc, 
        observations: obs, 
        isRawMaterial: tipo.includes('Raw')?true:false,
        isVirtual: tipo.includes('Virtual')?true:false,
        isFinished: tipo.includes('Finished')?true:false,
        isSemifinished: tipo.includes('Semifinished')?true:false
      })
      state.row={
        ...state.row,
        versionLock: state.row.versionLock+1,
        code: codigo, 
        externalCode: extCod, 
        measureUnitId: medida, 
        name: name, 
        description: desc, 
        observations: obs, 
        isRawMaterial: tipo.includes('Raw')?true:false,
        isVirtual: tipo.includes('Virtual')?true:false,
        isFinished: tipo.includes('Finished')?true:false,
        isSemifinished: tipo.includes('Semifinished')?true:false
      }
    };

    return(<>
        <h1>Detalle:</h1>
        <h2 className={classes.mMenos} >Material {state.row.id}</h2>
        <List>
          <TextField 
                className={classes.textField}
                disabled={!edit}
                id="outlined-basic"
                label="codigo"
                name="codigo"
                variant="outlined"
                value={codigo}
                onChange={(textFieldVal) => 
                setCodigo(textFieldVal.target.value)}
            /><br/>
            <TextField 
                className={classes.textField}
                disabled={!edit}
                id="outlined-basic"
                label="codigo_externo"
                name="codigo_externo"
                variant="outlined"
                value={extCod}
                onChange={(textFieldVal) => 
                  setExtCod(textFieldVal.target.value)}
            /><br/>
            <TextField
                className={classes.textField}
                disabled={!edit}
                id="outlined-basic"
                label="nombre"
                name="nombre"
                variant="outlined"
                value={name}
                onChange={(textFieldVal) => 
                setName(textFieldVal.target.value)}
            /><br/>
            <TextField 
                className={classes.textField}
                disabled={!edit}
                id="outlined-basic"
                label="descripcion"
                name="descripcion"
                variant="outlined"
                value={desc}
                onChange={(textFieldVal) => 
                setDesc(textFieldVal.target.value)}
            /><br/>
            <TextField 
                className={classes.textField}
                disabled={!edit}
                id="outlined-basic"
                label="observaciones"
                name="observaciones"
                variant="outlined"
                value={obs}
                onChange={(textFieldVal) => 
                setObs(textFieldVal.target.value)}
            /><br/>
            <InputLabel id="demo-mutiple-chip-label">Tipo</InputLabel>
            <Select
            labelId="demo-mutiple-chip-label"
              className={classes.textField}
              disabled={!edit}
              id="demo-mutiple-chip"
              multiple
              label="material"
              name="material"
              value={tipo}
              onChange={(textFieldVal) => 
              setTipo(textFieldVal.target.value)}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div >
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
            )}>
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select><br/> 
            <TextField 
                className={classes.textField}
                disabled={!edit}
                id="outlined-basic"
                label="medida"
                name="medida"
                variant="outlined"
                value={medida}
                onChange={(textFieldVal) => 
                setMedida(textFieldVal.target.value)}
            /><br/>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
              <Button  className={classes.b0} 
                  onClick={() => {setEdit(edit?false:true)
                  setCodigo(state.row.code);
                  setExtCod(state.row.externalCode);
                  setMedida(state.row.measureUnitId);
                  setName(state.row.name);
                  setDesc(state.row.description);
                  setObs(state.row.observations);
                  setTipo([
                    state.row.isRawMaterial?'Raw':'',
                    state.row.isVirtual?'Virtual':'',
                    state.row.isSemifinished?'Semifinished':'',
                    state.row.isFinished?'Finished':''
                    ].filter(material => material != ''));
                }}
              >{edit?'deshabilitar':'habilitar'}</Button>
              <Button  className={classes.b1} disabled={!edit}
              onClick={() => {
              update(codigo, extCod, medida, name, desc, obs, tipo)
              }}>Update</Button>
            </div>
          </List>
        </>
    )
}
