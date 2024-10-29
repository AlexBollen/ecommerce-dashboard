import { useState } from 'react';
import { Product } from '../../types/product';
import Dialog from '@mui/material/Dialog';
import EyeIcon from '../../icons/Eye';
import PenIcon from '../../icons/Pen';
import TrashIcon from '../../icons/Trash';
import {
  Button,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import FormEdit from './FormEdit';

const ActionsMenu = (rowData: Product) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEdit = async () => {
    setEditMode(true);
  };

  const handleDelete = async () => {
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    console.log(rowData.nombre_producto);
    setOpenDialog(false);
  };

  return (
    <div>
      <div className="flex items-center space-x-3.5">
        {/* Este componente esta pendiente de decidir si se usara o no */}
        {/* <button className="hover:text-primary">
          <EyeIcon />
        </button> */}
        <button className="hover:text-primary" onClick={handleEdit}>
          <PenIcon />
        </button>
        <button className="hover:text-primary" onClick={handleDelete}>
          <TrashIcon />
        </button>
      </div>
      {editMode && (
        <Dialog
          open={editMode}
          onClose={() => setEditMode(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent className="dark:bg-boxdark">
            <FormEdit {...rowData} />
          </DialogContent>
        </Dialog>
      )}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" sx={{ fontSize: '28px' }}>
          Confirmar eliminación
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            ¿Está seguro de eliminar este producto?
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: 'flex-end', mt: 3 }}
          >
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="primary"
            >
              Confirmar
            </Button>
            <Button
              onClick={handleCloseDialog}
              variant="contained"
              color="secondary"
            >
              Cancelar
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionsMenu;
