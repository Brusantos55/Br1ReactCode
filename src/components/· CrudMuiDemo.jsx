import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Close';
import {
  useGridApiRef,
  DataGrid,
  GridToolbarContainer,
  GridToolbar
} from '@mui/x-data-grid';
import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

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

function RowMenuCell(props) {
  const { api, id } = props;
  const classes = useStyles();
  const isInEditMode = api.getRowMode(id) === 'edit';

  const handleEditClick = (event) => {
    event.stopPropagation();
    api.setRowMode(id, 'edit');
  };

  const handleSaveClick = (event) => {
    event.stopPropagation();
    api.commitRowChange(id);
    api.setRowMode(id, 'view');

    const row = api.getRow(id);
    api.updateRows([{ ...row, isNew: false }]);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    api.updateRows([{ id, _action: 'delete' }]);
  };

  const handleCancelClick = (event) => {
    event.stopPropagation();
    api.setRowMode(id, 'view');

    const row = api.getRow(id);
    if (row.isNew) {
      api.updateRows([{ id, _action: 'delete' }]);
    }
  };

  if (isInEditMode) {
    return (
      <div className={classes.root}>
        <IconButton
          color="primary"
          size="small"
          aria-label="save"
          onClick={handleSaveClick}
        >
          <SaveIcon fontSize="small" />
        </IconButton>
        <IconButton
          color="inherit"
          size="small"
          aria-label="cancel"
          className={classes.textPrimary}
          onClick={handleCancelClick}
        >
          <CancelIcon fontSize="small" />
        </IconButton>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        className={classes.textPrimary}
        size="small"
        aria-label="edit"
        onClick={handleEditClick}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        color="inherit"
        size="small"
        aria-label="delete"
        onClick={handleDeleteClick}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

RowMenuCell.propTypes = {
  api: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

const rows = [
  {
    id: 1,
    name: 'Ben',
    age: 25,
    dateCreated: '12/05/2003',
    lastLogin: '19/07/2023',
  },
  {
    id: 4,
    name: 'Santi',
    age: 36,
    dateCreated: '12/05/2003',
    lastLogin: '19/07/2023',
  },
  {
    id: 3,
    name: 'Angel',
    age: 19,
    dateCreated: '12/05/2003',
    lastLogin: '19/07/2023',
  },
  {
    id: 2,
    name: 'Pedro',
    age: 28,
    dateCreated: '12/05/2003',
    lastLogin: '19/07/2023',
  },
  {
    id: 5,
    name: 'Jerry',
    age: 23,
    dateCreated: '12/05/2003',
    lastLogin: '19/07/2023',
  },
];

const columns = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  { field: 'age', headerName: 'Age', width: 120, editable: true },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'date',
    width: 180,
    editable: true,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true,
    // hide: true
  },
  {
    field: 'actions',
    headerName: 'Actions',
    renderCell: RowMenuCell,
    sortable: false,
    width: 100,
    headerAlign: 'center',
    filterable: false,
    align: 'center',
    disableColumnMenu: true,
    disableReorder: true,
  },
];



function EditToolbar(props) {
  const { apiRef } = props;

  const handleClick = () => {
    const id = 6;
    apiRef.current.updateRows([{ id, isNew: true }]);
    apiRef.current.setRowMode(id, 'edit');
    // Wait for the grid to render with the new row
    setTimeout(() => {
      apiRef.current.scrollToIndexes({
        rowIndex: apiRef.current.getRowsCount() - 1,
      });

      apiRef.current.setCellFocus(id, 'name');
    }, 150);
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  apiRef: PropTypes.shape({
    current: PropTypes.object.isRequired,
  }).isRequired,
};



export default function FullFeaturedCrudGrid() {
  const apiRef = useGridApiRef();

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        apiRef={apiRef}
        editMode="row"
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        components={{
          Toolbar: GridToolbar,
        }}
        componentsProps={{
          toolbar: { apiRef },
        }}
      />
    </div>
  );
}
