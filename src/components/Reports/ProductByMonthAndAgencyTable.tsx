import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import { ProductByMonthAndAgency } from '../../types/productByMonthAndAgency';
import ProductTwo from '../../images/product/product-02.png';

const ProductByMonthAndAgencyTable = () => {
  const [productsData, setProductsData] = useState<ProductByMonthAndAgency[]>([]);
  const [view, setView] = useState<string>('general'); 

  const handleViewChange = (view: string) => {
    setView(view);
    fetchData(view);
  };

  const fetchData = async (view: string) => {
    try {
      let endpoint = '';
      if (view === 'general') {
        endpoint = '/detail-quotes/month-product-summary-general';
      } else if (view === 'sucursal') {
        endpoint = '/detail-quotes/month-product-summary-agency';
      } else if (view === 'mes') {
        endpoint = '/detail-quotes/month-product-summary'; 
      }
      const response = await api.get(endpoint);
      setProductsData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(view);
  }, [view]);

  
  const getTitle = () => {
    if (view === 'general') {
      return 'Resumen General de Productos';
    } else if (view === 'sucursal') {
      return 'Resumen de Productos por Sucursal';
    } else if (view === 'mes') {
      return 'Resumen de Productos por Mes';
    }
    return '';
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          {getTitle()}
        </h2>

        <div className="flex flex-wrap items-start justify-between py-6 px-4 md:px-6 xl:px-7.5">
      
          <div className="flex w-full justify-center md:w-auto">
            <Link
              to="#"
              onClick={() => handleViewChange('mes')}
              className="inline-flex items-center justify-center rounded-md border border-meta-3 py-2 px-3 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-3 xl:px-5 w-full sm:w-auto"
            >
              Mes
            </Link>
          </div>

          
          <div className="flex w-full justify-center md:w-auto">
            <Link
              to="#"
              onClick={() => handleViewChange('sucursal')}
              className="inline-flex items-center justify-center rounded-md border border-meta-3 py-2 px-3 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-3 xl:px-5 w-full sm:w-auto"
            >
              Sucursal
            </Link>
          </div>

     
          <div className="flex w-full justify-center md:w-auto">
            <Link
              to="#"
              onClick={() => handleViewChange('general')}
              className="inline-flex items-center justify-center rounded-md border border-meta-3 py-2 px-3 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-3 xl:px-5 w-full sm:w-auto"
            >
              General
            </Link>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-3 border-t border-stroke py-4.5 px-6 dark:border-strokedark md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Producto</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Mes</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Cantidad</p>
          </div>
        </div>
        {productsData.map((product, key) => (
          <div
            className="grid grid-cols-3 border-t border-stroke py-4.5 px-6 dark:border-strokedark md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-1 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-12.5 w-15 rounded-md">
                  <img src={ProductTwo} alt="Product" />
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
        ))}
      </div>
    </div>
  );
};

export default ProductByMonthAndAgencyTable;
