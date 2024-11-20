import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { TopSellingProduct } from '../../types/topSellingProduct';
import { TopSellingProductAgency } from '../../types/topSellingProductAgency';
import ProductTwo from '../../images/product/product-02.png';

import { Link } from 'react-router-dom';
import { Box, Dialog, DialogContent, Stack } from '@mui/material';
import SelectGroupAgency from './Filters/SelectGroupAgency';

const BestSellingTable = () => {
  const [productsData, setProductsData] = useState<TopSellingProduct[]>([]);
  const [sucursalData, setSucursalData] = useState<TopSellingProductAgency[]>(
    [],
  );
  const [newMode, setNewMode] = useState(false);
  const [viewMode, setViewMode] = useState<'general' | 'sucursal'>('general');
  const [selectedAgency, setSelectedAgency] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedAgency === 0) {
          setViewMode('general');
          const response = await api.get('/detail-quotes/top-selling');
          setProductsData(response.data);
        } else {
          setViewMode('sucursal');
          const response = await api.get(
            `/detail-quotes/top-selling-agency/${selectedAgency}`,
          );
          setSucursalData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedAgency]);

  const handleAgencyChange = (agency: number) => {
    setSelectedAgency(agency);
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <Box sx={{ p: 3 }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: 'center', flex: '1 1 auto', flexWrap: 'wrap' }}
          >
            <SelectGroupAgency onChange={handleAgencyChange} />
          </Stack>
        </Box>

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
                    <p className="text-sm text-black dark:text-white">
                      {product.nombre_producto}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                  <p className="text-sm text-black dark:text-white">
                    {product.total_vendido}
                  </p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {product.id_producto}
                  </p>
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
                  <p className="text-sm text-black dark:text-white">
                    {product.nombre_producto}
                  </p>
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                  <p className="text-sm text-black dark:text-white">
                    {product.total_vendido}
                  </p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {product.id_producto}
                  </p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {product.nombre_sucursal}
                  </p>
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
