import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { ProductByMonthAndAgency } from '../../types/productByMonthAndAgency';
import ProductTwo from '../../images/product/product-02.png';
import SelectGroupAgencyAndMonth from './Filters/SelectGroupAgencyAndMonths';
import { Box, Dialog, DialogContent, Stack } from '@mui/material';

const ProductByMonthAndAgencyTable = () => {
  const [productsData, setProductsData] = useState<ProductByMonthAndAgency[]>([]);
  const [sucursalData, setSucursalData] = useState<ProductByMonthAndAgency[]>([]);
  const [monthData, setMonthData] = useState<ProductByMonthAndAgency[]>([]);
  const [newMode, setNewMode] = useState(false);
  const [viewMode, setViewMode] = useState<'general' | 'sucursal' | 'mes'>('general');
  const [selectedAgency, setSelectedAgency] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = '';
        if (viewMode === 'general') {
          endpoint = '/detail-quotes/month-product-summary-general';
        } else if (viewMode === 'sucursal') {
          endpoint = `/detail-quotes/month-product-summary-agency/${selectedAgency}`;
        } else if (viewMode === 'mes') {
          endpoint = '/detail-quotes/month-product-summary';
        }
        const response = await api.get(endpoint);

        if (viewMode === 'general') {
          setProductsData(response.data);
        } else if (viewMode === 'sucursal') {
          setSucursalData(response.data);
        } else if (viewMode === 'mes') {
          setMonthData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [viewMode, selectedAgency]);

  const handleAgencyChange = (agency: number) => {
    setSelectedAgency(agency);
    setViewMode(agency === 0 ? 'general' : 'sucursal'); 
  };

  const renderProductData = (data: ProductByMonthAndAgency[]) => {
    return data.map((product, key) => (
      <div
        className="grid grid-cols-3 border-t border-stroke py-4.5 px-6 dark:border-strokedark md:px-6 2xl:px-7.5"
        key={key}
      >
        <div className="col-span-1 flex items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-12.5 w-15 rounded-md">
              <img src={product.imagen} alt="Product" />
            </div>
            <p className="text-sm text-black dark:text-white">{product.nombre_producto}</p>
          </div>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm text-black dark:text-white">{product.mes}</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm text-black dark:text-white">{product.cantidad}</p>
        </div>
      </div>
    ));
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
            <SelectGroupAgencyAndMonth onChange={handleAgencyChange} />
          </Stack>
        </Box>

        {viewMode === 'general' && renderProductData(productsData)}
        {viewMode === 'sucursal' && renderProductData(sucursalData)}
        {viewMode === 'mes' && renderProductData(monthData)}
      </div>

      {newMode && (
        <Dialog open={newMode} onClose={() => setNewMode(false)} aria-labelledby="form-dialog-title">
          <DialogContent>
            <p>Este es el contenido del modal.</p>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ProductByMonthAndAgencyTable;