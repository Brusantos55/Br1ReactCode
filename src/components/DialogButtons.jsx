import React from 'react';
import * as yup from 'yup';
import ValidForm from './ValidForm';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";

const useStyles = makeStyles(() => ({
  dialog: {
    "& .MuiPaper-root":{width:'370px'}
  },
}))

export function VDialog(props) {
  const classes = useStyles();

  const initialvalues = props.iniVal?{
    name: props.iniVal?.name,
    medida: props.iniVal?.measureUnitId,
    arr: [
      props.iniVal.isRawMaterial?'Raw':'',
      props.iniVal.isVirtual?'Virtual':'',
      props.iniVal.isSemifinished?'Semifinished':'',
      props.iniVal.isFinished?'Finished':''
      ].filter(material => material != '')
  }:{}

  const validationSchema = props.filter?
  yup.object({ 
    name: yup.string(),
    medida: yup.number().typeError('medida must be a number'),
    arr: yup.array()
  }):yup.object({
    name: yup
      .string('Enter a valid name')
      .required('name is required'),
    medida: yup
      .number().typeError('medida must be a number'),
    arr: yup.array()
  });

  return (
      <Dialog className={classes.dialog}
      open={props.open} onClose={props.onClose}
      aria-labelledby="simple-dialog-title">
      <DialogTitle style={{textAlign:'center'}}
      id="simple-dialog-title">
          {props.add && 'Añadir'} 
          {props.filter && 'Filtrar'} 
          {props.edit && 'Editar'} 
      </DialogTitle>
      <ValidForm {...props} values={initialvalues} Schema={validationSchema}/>
      </Dialog>
  )
}

export function CustomButton(props) {
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    return (
      <div>
          <div onClick={handleClickOpen} style={{cursor: 'pointer'}}>
              {props.filter && <FilterListIcon/>} 
              {props.add && <AddIcon/>} 
              <span style={{
                position: 'relative', 
                marginRight: '10px',
                top: '-0.5em',
                left: '0.5em'
              }}>
              {props.filter && 'Filter'} 
              {props.add && 'Add'}
              </span>
          </div>
          <VDialog open={open} onClose={handleClose} {...props}/>
      </div>
    );
  }