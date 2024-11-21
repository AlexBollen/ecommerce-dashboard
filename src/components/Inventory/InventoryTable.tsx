import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Product } from '../../types/product';
import ActionsMenu from './ActionsMenu';
import { Link } from 'react-router-dom';
import FormAdd from './FormAdd';
import { Dialog, DialogContent } from '@mui/material';

const InventoryTable = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [newMode, setNewMode] = useState(false);
  const agency = localStorage.getItem('agency_employee');
  const agencyId = agency ? parseInt(agency, 10) : null;

  useEffect(() => {
    api
      .get('/products')
      .then(async (response) => {
        const products = response.data;

        const productPromises = products.map(
          (product: Omit<Product, 'existences'>) =>
            api
              .get(`/stocks/existencias_sucursal`, {
                params: {
                  id_producto: product.id_producto,
                  id_sucursal: agencyId,
                },
              })
              .then((existenceResponse) => ({
                ...product,
                existences: existenceResponse?.data ?? 0,
              }))
              .catch((error) => {
                console.error(
                  `Error obteniendo existencias de producto ${product.id_producto}`,
                  error,
                );
                return { ...product, existences: 0, quantity: 1 };
              }),
        );

        const productsWithExistences = await Promise.all(productPromises);

        setProductsData(productsWithExistences);
      })
      .catch((error) => {
        console.error('Error obteniendo productos', error);
      });
  }, []);

  const handleNewProduct = async () => {
    setNewMode(true);
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-start justify-between py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Administra y gestiona los productos
          </h4>
          <div className="flex w-full max-w-45 justify-end">
            <Link
              to="#"
              onClick={handleNewProduct}
              className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-5"
            >
              Agregar
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Producto</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Categoría</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Precio</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Existencias</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Acciones</p>
          </div>
        </div>

        {productsData.map((product, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-3 flex items-center">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="h-12.5 w-15 rounded-md">
                  <img src={product.imagen} alt="Product" />
                </div>
                <p className="text-sm text-black dark:text-white">
                  {product.nombre_producto}
                </p>
              </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {product.nombre_categoria}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                Q{new Intl.NumberFormat('es-gt').format(product.precio_venta)}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{product.existences}</p>
            </div>
            <div className="flex items-center space-x-3.5">
              <ActionsMenu {...product} />
            </div>
          </div>
        ))}
      </div>
      {newMode && (
        <Dialog
          open={newMode}
          onClose={() => setNewMode(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent className="dark:bg-boxdark">
            <FormAdd />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default InventoryTable;
