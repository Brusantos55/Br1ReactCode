import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { helpHttp } from './helpFetch';
import { makeStyles, TextField, Dialog, 
Button, DialogTitle } from "@material-ui/core";

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
  order: yup.number().typeError('order must be a number').required(),
  units: yup.number().typeError('units must be a number').required(),
})

export default function EditDialog(props) {
  const { onClose, open } = props;
  const classes = useStyles();
  let api = helpHttp();

  const handleClose = () => {
    onClose();
  };

  const formik = useFormik({
    initialValues: {
      id: props.id,
      order: props.row.compositionOrder,
      units: props.row.units,
      porcentaje: true
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const limpio = props.row.data.filter(row => row.componentId!==props.id)
      api.postComp(
          props.row.idm, limpio.concat({
          componentId: values.id,
          compositionOrder: values.order*1,
          units: values.units*1,
          isPercentage: values.porcentaje})
        ).then((res) => {
          props.row.reload('updated')
          onClose()
        }
      )
    }
  })

  return (
    <Dialog onClose={handleClose} open={open} aria-labelledby="simple-dialog-title">
      <DialogTitle id="simple-dialog-title">Edit Component</DialogTitle>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <TextField 
            name='order'
            label="Order"
            variant="outlined"
            value={formik.values?.order}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.order && Boolean(formik.errors.order)}
            helperText={formik.touched.order && formik.errors.order}
        />
        <TextField style={{margin: '10px 0'}}
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