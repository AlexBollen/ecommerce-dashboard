import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import TrashIcon from '../../icons/Trash';
import CompleteIcon from '../../icons/Complete';

interface TransferDetail {
  id_detalle_transferencia: number;
  cantidad_transferencia: number;
  created_at: string;
  updated_at: string;
  nombre_producto: string; 
  cantidad_actual: string;
}

interface Transference {
  id_transferencia: number;
  descripcion_transferencia: string;
  estado: number;
  created_at: string;
  updated_at: string;
  DetalleTransferencia: TransferDetail[];
  id_estado_transferencia: {
    id_estado_transferencia: number;
    nombre_estado_transferencia: string;
    estado: number;
  };
  id_usuario:{
    id_usuario: number;
    nombre_persona: string;
  };
  sucursal_Entrante: {
    id_sucursal: number;
    nombre_sucursal: string;
    direccion_detallada: string;
    telefono: string;
    correo: string;
  };
}
const sucursalEntranteIdString = localStorage.getItem('agency_employee');
  const sucursalentranteId = sucursalEntranteIdString
    ? parseInt(sucursalEntranteIdString, 10)
    : null;

const TransferTable = () => {
  const [transferencesData, setTransferencesData] = useState<Transference[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMode, setNewMode] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState<Transference | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    api
      .get(`/product-transfer/all/`)
      .then((response) => {
        setTransferencesData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching transferences:', error);
        setLoading(false);
      });
  }, []);

  const navigate = useNavigate();

  const handleAddTransfer = () => {
    navigate('/newProductTransfer');
  };

  const handleCompleteTransfer = async (id_transferencia: number) => {
    try {
      if (
        window.confirm(
          '¿Estás seguro de que deseas marcar esta transferencia como completada?'
        )
      ) {
        await api.patch(`/product-transfer/${id_transferencia}/actualizar-estado-y-crear-stocks`);
        alert('La transferencia se marcó como completada.');
        
        const response = await api.get(`/product-transfer/all`);
        setTransferencesData(response.data);
        setTransferencesData((prev) =>
          prev.map((transfer) =>
            transfer.id_transferencia === id_transferencia
              ? {
                  ...transfer,
                  id_estado_transferencia: {
                    ...transfer.id_estado_transferencia,
                    nombre_estado_transferencia: 'Completada',
                  },
                }
              : transfer
          )
        );
      }
    } catch (error) {
      console.error('Error al completar la transferencia:', error);
      alert('Hubo un error al intentar completar la transferencia.');
    }
  };
  

  const handleDeleteTransfer = async (id_transferencia: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta transferencia?')) {
      try {
        await api.delete(`/product-transfer/${id_transferencia}`);
        setTransferencesData((prev) =>
          prev.filter((transfer) => transfer.id_transferencia !== id_transferencia)
        );
        alert('Transferencia eliminada con éxito');
      } catch (error) {
        console.error('Error al eliminar transferencia:', error);
        alert('Hubo un error al intentar eliminar la transferencia.');
      }
    }
  };

  const handleViewDetails = async (id_transferencia: number) => {
    try {
      //console.log("ID BUSCADO: ",id_transferencia);
      const transferResponse = await api.get(`/product-transfer/${id_transferencia}`);
      const detailsResponse = await api.get(`/transfer-detail/${id_transferencia}/nombre-producto`);
  
      // Se combinan los detalles de la transferencia con los detalles de los productos
      const combinedDetails = transferResponse.data.DetalleTransferencia.map((TransferDetail) => {
        const productDetail = detailsResponse.data.find(
          (prod) => prod.id_detalle_transferencia === TransferDetail.id_detalle_transferencia
        );
        return {
          ...TransferDetail,
          nombre_producto: productDetail ? productDetail.nombre_producto : "Producto desconocido",
          cantidad_actual: productDetail ? productDetail.cantidad_actual : null,
        };
      });
  
      setSelectedTransfer({
        ...transferResponse.data,
        DetalleTransferencia: combinedDetails,
      });
  
      setIsDetailsModalOpen(true);
    } catch (error) {
      console.error("Error fetching transfer details:", error);
    }
  };
  

  if (loading) {
    return <p>Cargando transferencias...</p>;
  }

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-start justify-between py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Transferencias de Productos
          </h4>
          <div className="flex w-full max-w-45 justify-end">
          <button
              onClick={handleAddTransfer}
              className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-5"
            >
              Agregar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Descripción</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Estado</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Sucursal Entrante</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Creada Por</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Detalles</p>
          </div>
          <div className="col-span-1 flex items-right">
            <p className="font-medium">Acciones</p>
          </div>
        </div>

        {transferencesData.map((transference) => (
          <div
            className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
            key={transference.id_transferencia}
          >
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {transference.descripcion_transferencia}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {transference.id_estado_transferencia.nombre_estado_transferencia}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {transference.sucursal_Entrante.nombre_sucursal}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {transference.id_usuario.nombre_persona}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <Link
                to="#"
                className="text-sm text-primary hover:underline"
                onClick={() => handleViewDetails(transference.id_transferencia)}
              >
                Ver Detalles
              </Link>
            </div>
            <div className="flex w-full max-w-45 justify-center">
              <button
                onClick={() => handleCompleteTransfer(transference.id_transferencia)}
                className="hover:text-primary"
              >
                <CompleteIcon />
              </button>
            </div>
            <div className="flex w-full max-w-45 justify-center">
              <button
                onClick={() => handleDeleteTransfer(transference.id_transferencia)}
                className="hover:text-primary"
              >
                <TrashIcon />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isDetailsModalOpen && selectedTransfer && (
        <Dialog
          open={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          aria-labelledby="details-dialog-title"
        >
          <DialogTitle id="details-dialog-title">
            Detalles de la Transferencia
          </DialogTitle>
          <DialogContent className="dark:bg-boxdark">
            <p><strong>Descripción:</strong> {selectedTransfer.descripcion_transferencia}</p>
            <p><strong>Estado:</strong> {selectedTransfer.id_estado_transferencia.nombre_estado_transferencia}</p>
            <p><strong>Sucursal Entrante:</strong> {selectedTransfer.sucursal_Entrante.nombre_sucursal}</p>
            <p><strong>Detalles:</strong></p>
            <ul>
            {selectedTransfer.DetalleTransferencia.map((TransferDetail) => (
              <li key={TransferDetail.id_detalle_transferencia}>
                <strong>{TransferDetail.nombre_producto}:</strong> {TransferDetail.cantidad_transferencia} unidades
                
              </li>
            ))}
          </ul>
          </DialogContent>
          <DialogActions>
            <button
              onClick={() => setIsDetailsModalOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cerrar
            </button>
          </DialogActions>
        </Dialog>
      )}

    </>
  );
};

export default TransferTable;
