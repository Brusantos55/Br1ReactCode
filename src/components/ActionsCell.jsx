import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import EditDialog from './EditComp';
import { helpHttp } from './helpFetch';

const api = helpHttp();
const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    textPrimary: {
      color: theme.palette.text.primary,
    },
  }),
  { defaultTheme },
);

export default function RowMenuCell(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const delComp = () => {
    const nuevo = props.row.data.filter(row => row.componentId!==props.id)
    api.postComp(props.row.idm, nuevo).then((res) =>
      props.row.reload('deleted')
    )
  };

  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        className={classes.textPrimary}
        size="small"
        aria-label="edit"
        onClick={handleOpen}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <EditDialog {...props} open={open} onClose={handleClose}/>
      <IconButton
        color="inherit"
        size="small"
        aria-label="delete"
        onClick={delComp}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
}
