import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { TopSellingProduct } from '../../types/topSellingProduct';
import { TopSellingProductAgency } from '../../types/topSellingProductAgency';
import ProductTwo from '../../images/product/product-02.png';

import { Link } from 'react-router-dom';
import { Dialog, DialogContent } from '@mui/material';

const BestSellingTable = () => {
  const [productsData, setProductsData] = useState<TopSellingProduct[]>([]);
  const [sucursalData, setSucursalData] = useState<TopSellingProductAgency[]>([]);
  const [newMode, setNewMode] = useState(false);
  const [viewMode, setViewMode] = useState<'general' | 'sucursal'>('general');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (viewMode === 'general') {
          const response = await api.get('/detail-quotes/top-selling');
          setProductsData(response.data);
        } else if (viewMode === 'sucursal') {
          const response = await api.get('/detail-quotes/top-selling-agency');
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

  const handleViewChange = (view: 'general' | 'sucursal') => {
    setViewMode(view);
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-start justify-between py-6 px-4 md:px-6 xl:px-7.5">
          <div className="flex w-full max-w-45 justify-center">
            <Link
              to="#"
              onClick={() => handleViewChange('general')}
              className="inline-flex items-center justify-center rounded-md border border-meta-3 py-2 px-2 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-3 xl:px-5"
            >
              General
            </Link>
          </div>
          <h4 className="text-xl font-semibold text-black dark:text-white">Productos</h4>
          <div className="flex w-full max-w-45 justify-center">
            <Link
              to="#"
              onClick={() => handleViewChange('sucursal')}
              className="inline-flex items-center justify-center rounded-md border border-meta-3 py-2 px-2 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-3 xl:px-5"
            >
              Sucursal
            </Link>
          </div>
        </div>

        {viewMode === 'general' ? (
          <div>
            <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-3 flex items-center">
                <p className="font-medium">Producto</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="font-medium">Total Vendido</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium">Id_Producto</p>
              </div>
            </div>
            {productsData.map((product, key) => (
              <div
                className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                key={key}
              >
                <div className="col-span-3 flex items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="h-12.5 w-15 rounded-md">
                      <img src={ProductTwo} alt="Product" />
                    </div>
                    <p className="text-sm text-black dark:text-white">{product.nombre_producto}</p>
                  </div>
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                  <p className="text-sm text-black dark:text-white">{product.total_vendido}</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black dark:text-white">{product.id_producto}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
                <p className="font-medium">Producto</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="font-medium">Total Vendido</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="font-medium">Id_Producto</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="font-medium">Sucursal</p>
              </div>
            </div>
            {sucursalData.map((product, key) => (
              <div
                className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                key={key}
              >
                 <div className="col-span-2 hidden items-center sm:flex">
                  <p className="text-sm text-black dark:text-white">{product.nombre_producto}</p>
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                  <p className="text-sm text-black dark:text-white">{product.total_vendido}</p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-black dark:text-white">{product.id_producto}</p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-black dark:text-white">{product.nombre_sucursal}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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

export default BestSellingTable;
