import React from 'react';
import { useFormik } from 'formik';
import { helpHttp } from './helpFetch';
import { makeStyles } from "@material-ui/core";


import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";

import { MenuItem, Select, Input, Chip, InputLabel }from '@material-ui/core/';

const api = helpHttp();
const names = [
  'Raw',
  'Virtual',
  'Finished',
  'Semifinished',
];

const useStyles = makeStyles(() => ({
  form:{
    display:'flex',
    flexDirection:'column',
    margin:'0 20px 10px',
    justifyContent:'center'
  },
  b1:{
    justifySelf:'end',
    borderRadius:'10px', 
    backgroundColor:'#FFCF57',
    padding:'10px 25px'
  },
  input:{
    margin:'10px',
  },
  inputS:{
    margin:'0 10px'
  },
  inputSl:{
    margin:'10px 10px 0'
  }
}))

export default function ValidForm (props) {
  const{page, pageSize, setData, setFilter} = props.reloadInf
  const { onClose } = props;
  const classes = useStyles();

  const formik = useFormik({
    initialValues: props.values,
    validationSchema: props.Schema,
    onSubmit: (values) => {
      if(props.add){
        api.postMaterials({
          code: values.codigo, 
          externalCode: values.extCod, 
          name: values.name, 
          description: values.desc, 
          observations: values.obs,
          measureUnitId: values.medida, 
          isRawMaterial: values.arr.includes('Raw')?true:false,
          isVirtual: values.arr.includes('Virtual')?true:false,
          isFinished: values.arr.includes('Finished')?true:false,
          isSemifinished: values.arr.includes('Semifinished')?true:false
        }).then(()=>{
          api.getMaterials(page,pageSize)
          .then((res)=>{
            setData(res)
          })
        })
      }
      if(props.filter){
        setFilter({
          ...props.iniVal,
          code: values.codigo, 
          externalCode: values.extCod, 
          name: values.name, 
          description: values.desc, 
          observations: values.obs, 
          measureUnitId: values.medida,
          isRawMaterial: values.arr.includes('Raw')?true:undefined,
          isVirtual: values.arr.includes('Virtual')?true:undefined,
          isFinished: values.arr.includes('Finished')?true:undefined,
          isSemifinished: values.arr.includes('Semifinished')?true:undefined
        })
      }
      onClose();
      // alert(JSON.stringify(values, null, 2))
    },
  });

  return (
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <TextField
          className={classes.input}
          variant="outlined"
          name="code"
          label="code"
          value={formik.values?.code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.code && Boolean(formik.errors.code)}
          helperText={formik.touched.code && formik.errors.code}
        />
        <TextField
          className={classes.input}
          variant="outlined"
          name="extCode"
          label="extCode"
          value={formik.values?.extCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.extCode && Boolean(formik.errors.extCode)}
          helperText={formik.touched.extCode && formik.errors.extCode}
        />
        <TextField
          className={classes.input}
          variant="outlined"
          name="name"
          label="name"
          value={formik.values?.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          className={classes.input}
          variant="outlined"
          name="desc"
          label="desc"
          value={formik.values?.desc}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.desc && Boolean(formik.errors.desc)}
          helperText={formik.touched.desc && formik.errors.desc}
        />
        <TextField
          className={classes.input}
          variant="outlined"
          name="obs"
          label="obs"
          value={formik.values?.obs}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.obs && Boolean(formik.errors.obs)}
          helperText={formik.touched.obs && formik.errors.obs}
        />
        <TextField
          className={classes.input}
          variant="outlined"
          name="medida"
          label="medida"
          value={formik.values?.medida}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.medida && Boolean(formik.errors.medida)}
          helperText={formik.touched.medida && formik.errors.medida}
        />
        <InputLabel id="demo-mutiple-chip-label" 
        className={classes.inputSl} >Tipo</InputLabel>
            <Select
            labelId="demo-mutiple-chip-label"
              style={{marginBottom:'20px'}}
              className={classes.inputS}
              multiple
              id="demo-mutiple-chip"
              label="Array"
              name="arr"
              value={formik.values?.arr??[]}
              onChange={formik.handleChange}
              input={<Input id="select-multiple-chip" />}
              error={formik.touched.arr && Boolean(formik.errors.arr)}
              helperText={formik.touched.arr && formik.errors.arr}
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
            </Select>
          <Button className={classes.b1} type='Submit'> 
          Submit
        </Button>
      </form>
  );
};