import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Product } from '../../types/product';
import { useNavigate } from 'react-router-dom';

const NewTransfer = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [description, setDescription] = useState('');
  const [AgenciesOfficies, setAgenciesOfficies] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState<number | null>(null);
  const [transferStates, setTransferStates] = useState([]); 
  const [details, setDetails] = useState<
    { productoIdProducto: number; nombre_producto: string; cantidadTransferida: number; id_stock: number }[]
  >([]);
  const userIdString = localStorage.getItem('sub'); 
  const userId = userIdString ? parseInt(userIdString, 10) : null;

  console.log(userId);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Obtener productos
    api
      .get('/products')
      .then((response) => {
        setProductsData(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.log(error));

    // Obtener agencias
    api
      .get('/agencies')
      .then((response) => {
        setAgenciesOfficies(response.data);
      })
      .catch((error) => console.log(error));

    // Obtener estados de transferencia
    api
      .get('/transfer-states')
      .then((response) => {
        setTransferStates(response.data);
      })
      .catch((error) => console.log(error));

  }, []);

  const getStockFromAPI = async (productId: number) => {
    try {
      const response = await api.get(`/stocks/stock/${productId}`);
      if (response.status !== 200) {
        throw new Error(`Error al obtener el stock: ${response.status}`);
      }
      if (response.data) {
        console.log('Respuesta del stock API:', response.data);
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Error al obtener el stock:", error);
      return null;
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    setFilteredProducts(
      productsData.filter((product) =>
        product.nombre_producto.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const addProductToDetails = async (product: Product) => {
    const stockData = await getStockFromAPI(product.id_producto);
    console.log(stockData);
    if (stockData) {
      setDetails((prevDetails) => {
        const stock = parseInt(stockData.id_stock, 10);
        console.log("ID STOCK:", stock);
        const exists = prevDetails.some((item) => item.productoIdProducto === product.id_producto);
        if (exists) {
          return prevDetails.map((item) =>
            item.productoIdProducto === product.id_producto
              ? { ...item, cantidadTransferida: item.cantidadTransferida + 1 }
              : item
          );
        }
  
        return [
          ...prevDetails,
          {
            productoIdProducto: product.id_producto,
            nombre_producto: product.nombre_producto,
            id_stock: stock,
            cantidadTransferida: 1,
          },
        ];
      });
    } else {
      console.error(`No se encontró stock para el producto con ID ${product.id_producto}`);
    }
  };

  const updateProductQuantity = (productId: number, amount: number) => {
    setDetails((prev) =>
      prev
        .map((item) =>
          item.productoIdProducto === productId
            ? { ...item, cantidadTransferida: Math.max(item.cantidadTransferida + amount, 0) }
            : item
        )
        .filter((item) => item.cantidadTransferida > 0)
    );
  };


  const handleSubmit = () => {
    if (!description || !selectedAgency) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const transferData = {
      descripcion_transferencia: description,
      sucursal_Saliente: 1,
      sucursal_Entrante: selectedAgency,
      id_estado_transferencia: 2,
      id_usuario: userId,
      detalles: details.map((detail) => ({
        productoIdProducto: detail.productoIdProducto,
        id_stock: detail.id_stock,
        cantidad_transferida: detail.cantidadTransferida,
      })),
    };

    api
      .post('/product-transfer', transferData)
      .then((response) => {
        alert("Creada con éxito");

        setDescription('');
        setSelectedAgency(null);
        setDetails([]);

        navigate('/productTransfer');
      })
      .catch((error) => {
        alert("Error al crear la transferencia: "+ error);
        console.error('Error al crear la transferencia:', error);
      });
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-start justify-between py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Transferencia de Productos
          </h4>
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="Buscar productos..."
            className="rounded-md border border-stroke px-4 py-2 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Selección en listas */}
        <div className="py-4 px-4 space-y-4">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción de la transferencia"
            className="w-full rounded-md border border-stroke px-4 py-2 dark:bg-gray-800 dark:text-white"
          />
          <select
            value={selectedAgency || ''}
            onChange={(e) => {
              const agencyId = Number(e.target.value);
              setSelectedAgency(agencyId);
              //console.log('Sucursal seleccionada:', agencyId);
            }}
            className="w-full rounded-md border border-stroke px-4 py-2 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Seleccionar sucursal entrante</option>
            {AgenciesOfficies.map((agency: any) => (
              <option key={agency.id_sucursal} value={agency.id_sucursal}>
                {agency.nombre_sucursal}
              </option>
            ))}
          </select>
        </div>

        {/* Productos */}
        {filteredProducts.map((product) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark"
            key={product.id_producto}
          >
            <div className="col-span-3 flex flex-col">
              <p>{product.nombre_producto}</p>
              <p>Categoría: {product.nombre_categoria}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <button
                onClick={() => addProductToDetails(product)}
                className="rounded-md bg-primary px-2 py-1 text-white hover:bg-primary-dark"
              >
                Agregar
              </button>
            </div>
          </div>
        ))}

        {/* Detalle */}
        <div className="py-4 px-4">
          <h5>Detalles de la Transferencia:</h5>
          {details.length > 0 ? (
            details.map((detail) => (
              <div key={detail.productoIdProducto} className="flex items-center space-x-4">
                <p>Producto: {detail.nombre_producto}</p>
                <p>Cantidad: {detail.cantidadTransferida}</p>
                <button
                  onClick={() => updateProductQuantity(detail.productoIdProducto, -1)}
                  className="rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                >
                  -
                </button>
                <button
                  onClick={() => updateProductQuantity(detail.productoIdProducto, 1)}
                  className="rounded-md bg-green-500 px-2 py-1 text-white hover:bg-green-600"
                >
                  +
                </button>
              </div>
            ))
          ) : (
            <p>No hay productos seleccionados para la transferencia.</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Enviar Transferencia
        </button>
      </div>
    </>
  );
};

export default NewTransfer;