import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent } from '@mui/material';


interface TransferDetail {
  id_detalle_transferencia: number;
  cantidad_transferencia: number;
  created_at: string;
  updated_at: string;
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
  sucursal_Entrante: {
    id_sucursal: number;
    nombre_sucursal: string;
    direccion_detallada: string;
    telefono: string;
    correo: string;
  };
}

const TransferTable = () => {
  const [transferencesData, setTransferencesData] = useState<Transference[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [newMode, setNewMode] = useState(false);

  // Fetch de datos desde la API
  useEffect(() => {
    api
      .get('/product-transfer') 
      .then((response) => {
        setTransferencesData(response.data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching transferences:', error);
        setLoading(false);
      });
  }, []);

  const handleNewTransfer = () => {
    setNewMode(true); //Modal
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
            <Link
              to="#"
              onClick={handleNewTransfer}
              className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-5"
            >
              Agregar
            </Link>
          </div>
        </div>

        {}
        <div className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Descripción</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Estado</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Sucursal Entrante</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Acciones</p>
          </div>
        </div>

        {}
        {transferencesData.map((transference) => (
          <div
            className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
            key={transference.id_transferencia}
          >
            <div className="col-span-2 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {transference.descripcion_transferencia}
              </p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {transference.id_estado_transferencia.nombre_estado_transferencia}
              </p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {transference.sucursal_Entrante.nombre_sucursal}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <Link
                to="#"
                className="text-sm text-primary hover:underline"
              >
                Ver Detalles
              </Link>
            </div>
          </div>
        ))}
      </div>

      {}
      {newMode && (
        <Dialog
          open={newMode}
          onClose={() => setNewMode(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent className="dark:bg-boxdark">
            <p>Se va a abrir otra página</p>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default TransferTable;
