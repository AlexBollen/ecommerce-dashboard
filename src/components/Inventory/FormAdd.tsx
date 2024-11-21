import { useState } from 'react';
import api from '../../utils/api';
import SelectGroupBrand from './SelectGroupBrand';
import SelectGroupCategory from './SelectGroupCategory';

const FormAdd = ({ onClose }: { onClose: () => void }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [file, setFile] = useState();
  const [nombreProducto, setNombreProducto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [modelo, setModelo] = useState('');
  const [cantidadMinima, setCantidadMinima] = useState('');
  const [precioCosto, setPrecioCosto] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleCategoryChange = (category: number) => {
    setSelectedCategory(category);
  };
  const handleBrandChange = (brand: number) => {
    setSelectedBrand(brand);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append('nombre_producto', nombreProducto);
      formData.append('descripcion_producto', descripcion);
      formData.append('modelo_producto', modelo);
      formData.append('cantidad_minima', cantidadMinima);
      formData.append('precio_costo', precioCosto);
      formData.append('precio_venta', precioVenta);
      formData.append('categoria', selectedCategory.toString());
      formData.append('marca', selectedBrand.toString());

      if (file) {
        formData.append('imagen', file);
      }

      const response = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Agregar nuevo producto
          </h3>
        </div>
        <form action="#">
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Nombre <span className="text-meta-1">*</span>
              </label>
              <input
                onChange={(e) => {
                  setNombreProducto(e.target.value);
                }}
                type="text"
                placeholder="Nombre del producto"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Descripción
              </label>
              <input
                onChange={(e) => {
                  setDescripcion(e.target.value);
                }}
                type="text"
                placeholder="Descripción del producto"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Cantidad mínima
                </label>
                <input
                  onChange={(e) => {
                    setCantidadMinima(e.target.value);
                  }}
                  type="text"
                  placeholder="Cantidad de alerta"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Modelo
                </label>
                <input
                  onChange={(e) => {
                    setModelo(e.target.value);
                  }}
                  type="text"
                  placeholder="Modelo del producto"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Precio costo
                </label>
                <input
                  onChange={(e) => {
                    setPrecioCosto(e.target.value);
                  }}
                  type="text"
                  placeholder="Q."
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Precio venta
                </label>
                <input
                  onChange={(e) => {
                    setPrecioVenta(e.target.value);
                  }}
                  type="text"
                  placeholder="Q."
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5">
              <SelectGroupCategory onChange={handleCategoryChange} />
            </div>

            <div className="mb-4.5">
              <SelectGroupBrand onChange={handleBrandChange} />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-black dark:text-white">
                Agregar imagen
              </label>
              <input
                type="file"
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                onChange={handleFileChange}
              />
            </div>

            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              onClick={handleSubmit}
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormAdd;
