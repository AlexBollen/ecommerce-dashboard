import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Product } from '../../types/product';
import ActionsMenu from './ActionsMenu';
import { Link } from 'react-router-dom';
import FormAdd from './FormAdd';
import { Dialog, DialogContent } from '@mui/material';

const InventoryTable = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [newMode, setNewMode] = useState(false);
  const agency = localStorage.getItem('agency_employee');
  const agencyId = agency ? parseInt(agency, 10) : null;
  const api_url = import.meta.env.VITE_API_URL

  const fetchUsers = async (page = 1) => {
    api
      .get('/products/productos_paginados', {
        params: { page: page, limit: pageSize },
      })
      .then(async (response) => {
        const products = response.data.data;
        setTotalPages(response.data.totalPages);
        setCurrentPage(page);
        console.log(response.data)

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
                imagen: `${api_url}/${product.imagen}`,
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
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [pageSize]);

  const handleNewProduct = async () => {
    setNewMode(true);
  };

  const handleCloseNewProduct = () => {
    setNewMode(false);
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
              <p className="text-sm text-black dark:text-white">
                {product.existences}
              </p>
            </div>
            <div className="flex items-center space-x-3.5">
              <ActionsMenu {...product} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center py-4 w-100 ml-auto">
        <div className="py-4">
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              fetchUsers(1);
            }}
            className="border rounded px-2 py-1 dark:border-form-strokedark dark:bg-form-input"
          >
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>
        <button
          disabled={currentPage === 1}
          onClick={() => fetchUsers(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 dark:border-form-strokedark dark:bg-form-input"
        >
          Anterior
        </button>
        <p className="text-sm">
          Página {currentPage} de {totalPages}
        </p>
        <button
          disabled={currentPage === totalPages}
          onClick={() => fetchUsers(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 dark:border-form-strokedark dark:bg-form-input"
        >
          Siguiente
        </button>
      </div>

      {newMode && (
        <Dialog
          open={newMode}
          onClose={() => setNewMode(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent className="dark:bg-boxdark">
            <FormAdd
              // onActionComplete={fetchProducts}
              onClose={handleCloseNewProduct}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default InventoryTable;
