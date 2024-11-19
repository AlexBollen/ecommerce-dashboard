import { useState } from 'react';
import api from '../../utils/api';

const FormAddRole = ({
  onActionComplete,
  onClose,
}: {
  onActionComplete: () => void;
  onClose: () => void;
}) => {
  const [nombreRol, setNombreRol] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        nombre_rol: nombreRol,
        descripcion_rol: descripcion,
      };
      const response = await api.post('/roles', data);
      if (response.status === 201) {
        onActionComplete();
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
            Agregar nuevo rol
          </h3>
        </div>
        <form action="#">
          <div className="p-6.5 w-125">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Rol
                </label>
                <input
                  type="text"
                  placeholder="Nombre rol"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e) => setNombreRol(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Descripción
                </label>
                <input
                  type="text"
                  placeholder="Descripción del rol"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
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

export default FormAddRole;
