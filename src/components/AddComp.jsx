import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { helpHttp } from './helpFetch';
import { makeStyles, TextField, Dialog,
Button,DialogTitle } from "@material-ui/core";

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
  check:{
    display: 'flex',
    justifyContent: 'center',
  }
}))


const validationSchema = yup.object({ 
  id: yup.number().typeError('id must be a number'),
  order: yup.number().typeError('order must be a number'),
  units: yup.number().typeError('units must be a number'),
})

function FilterDialog(props) {
  const { onClose, open, idM, prev } = props;
  const classes = useStyles();
  let api = helpHttp();

  const handleClose = () => {
    onClose();
  };

  const formik = useFormik({
    initialValues: {
      id: '',
      order: '',
      units: '',
      porcentaje: true
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        api.postComp(idM, prev.concat({
          componentId: values.id*1,
          compositionOrder: values.order*1,
          units: values.units*1,
          isPercentage: values.porcentaje 
        })).then(()=>{
          api.getComp(idM)
          .then((res)=>{
            props.setData(res)
          })
        })
      }
    })

  return (
    <Dialog onClose={handleClose} open={open} aria-labelledby="simple-dialog-title">
      <DialogTitle id="simple-dialog-title">Add Component</DialogTitle>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <TextField
            name='id'
            label="id"
            variant="outlined"
            value={formik.values?.id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.id && Boolean(formik.errors.id)}
            helperText={formik.touched.id && formik.errors.id}
        />
        <TextField style={{margin: '10px 0'}}
            name='order'
            label="Order"
            variant="outlined"
            value={formik.values?.order}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.order && Boolean(formik.errors.order)}
            helperText={formik.touched.order && formik.errors.order}
        />
        <TextField 
            name='units'
            label="units"
            variant="outlined"
            value={formik.values?.units}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.units && Boolean(formik.errors.units)}
            helperText={formik.touched.units && formik.errors.units}
        />
        <Button className={classes.b1} type='Submit'> 
          Submit
        </Button>
      </form>
    </Dialog>
  );
}


export default function AddDialogButton(props) {

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
            <AddIcon /> 
            <span style={{position: 'relative', marginRight: '10px',
            top: '-0.5em',left: '0.5em'}}>Add</span>
        </div>
        <FilterDialog  open={open} onClose={handleClose} {...props} />
    </div>
  );
}
