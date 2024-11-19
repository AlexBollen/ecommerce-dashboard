import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { BestCustomer } from '../../types/bestCustomer';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent } from '@mui/material';

const BestCustomerTable = () => {
  const [productsData, setProductsData] = useState<BestCustomer[]>([]);
  const [sucursalData, setSucursalData] = useState<BestCustomer[]>([]);
  const [newMode, setNewMode] = useState(false);
  const [viewMode, setViewMode] = useState<'sucursal' | 'general'>('sucursal');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (viewMode === 'sucursal') {
          const response = await api.get('/quotes/best-customer-agency');
          setProductsData(response.data);
        } else if (viewMode === 'general') {
          const response = await api.get('/quotes/best-customer-general');
          setSucursalData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [viewMode]);

  const handleNewProduct = () => {
    setNewMode(true);
  };

  const handleViewChange = (view: 'sucursal' | 'general') => {
    setViewMode(view);
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between py-6 px-4 md:px-6 xl:px-7.5">
          <div className="flex w-full max-w-45 justify-center">
            <Link
              to="#"
              onClick={() => handleViewChange('sucursal')}
              className="inline-flex items-center justify-center rounded-md border border-meta-3 py-2 px-2 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-3 xl:px-5"
            >
              Sucursal
            </Link>
          </div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {viewMode === 'sucursal' ? 'Clientes por Sucursal' : 'Clientes Generales'}
          </h4>
          <div className="flex w-full max-w-45 justify-center">
            <Link
              to="#"
              onClick={() => handleViewChange('general')}
              className="inline-flex items-center justify-center rounded-md border border-meta-3 py-2 px-2 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-3 xl:px-5"
            >
              General
            </Link>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'sucursal' ? (
          <div>
            {/* Header row */}
            <div className="grid grid-cols-[2fr,3fr,1fr] border-t border-stroke py-4.5 px-4 dark:border-strokedark">
              <div className="flex items-center">
                <p className="font-medium">Cliente</p>
              </div>
              <div className="flex items-center">
                <p className="font-medium">Cantidad de compras</p>
              </div>
              <div className="flex items-center">
                <p className="font-medium">Sucursal</p>
              </div>
            </div>

            {/* Data rows */}
            {productsData.map((product, key) => (
              <div
                className="grid grid-cols-[2fr,3fr,1fr] border-t border-stroke py-4.5 px-4 dark:border-strokedark"
                key={key}
              >
                <div className="flex items-center">
                  <p className="text-sm text-black dark:text-white">{product.nombre_cliente}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-black dark:text-white">{product.cantidad_compras}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-black dark:text-white">{product.nombre_sucursal}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {/* Header row */}
            <div className="grid grid-cols-[2fr,3fr,1fr] border-t border-stroke py-4.5 px-4 dark:border-strokedark">
              <div className="flex items-center">
                <p className="font-medium">Cliente</p>
              </div>
              <div className="flex items-center">
                <p className="font-medium">Cantidad de compras</p>
              </div>
              <div className="flex items-center">
                <p className="font-medium">Sucursal</p>
              </div>
            </div>

            {/* Data rows */}
            {sucursalData.map((product, key) => (
              <div
                className="grid grid-cols-[2fr,3fr,1fr] border-t border-stroke py-4.5 px-4 dark:border-strokedark"
                key={key}
              >
                <div className="flex items-center">
                  <p className="text-sm text-black dark:text-white">{product.nombre_cliente}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-black dark:text-white">{product.cantidad_compras}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-black dark:text-white">{product.nombre_sucursal}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {newMode && (
        <Dialog
          open={newMode}
          onClose={() => setNewMode(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>{/* Contenido del modal */}</DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default BestCustomerTable;
