import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { LowQuantityProduct } from '../../types/lowQuantityProduct';
import ProductTwo from '../../images/product/product-02.png';

const LowQuantityTable = () => {
  const [productsData, setProductsData] = useState<LowQuantityProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/stocks/low-quantity'); 
        setProductsData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Productos con baja cantidad
        </h4>
      </div>

      <div>
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Id Producto</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Producto</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Cantidad</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Stock</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Sucursal</p>
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
                  <img src={product.imagen} alt="Product" />
                </div>
                <p className="text-sm text-black dark:text-white">{product.id_producto}</p>
              </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">{product.nombre_producto}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{product.cantidad_actual}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{product.id_stock}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{product.nombre_sucursal}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowQuantityTable;
