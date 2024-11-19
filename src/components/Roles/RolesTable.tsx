import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Role } from '../../types/role';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent } from '@mui/material';
import ActionsMenu from './ActionsMenu';
import FormAddRole from './FormAddRole';

const RolesTable = () => {
  const [rolesData, setRolesData] = useState<Role[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [newMode, setNewMode] = useState(false);

  const fetchRoles = async (page = 1) => {
    try {
      const response = await api.get('/roles', {
        params: {
          page: page,
          limit: pageSize,
        },
      });
      setRolesData(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRoles(currentPage);
  }, [pageSize]);

  const handleCloseNewRole = () => {
    setNewMode(false);
  };

  const handleNewRole = () => {
    setNewMode(true);
  };
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-start justify-between py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Administra y gestiona los roles
          </h4>
          <div className="flex w-full max-w-45 justify-end">
            <Link
              to="#"
              onClick={handleNewRole}
              className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-5"
            >
              Agregar
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Id</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Nombre rol</p>
          </div>
          <div className="col-span-4 flex items-center">
            <p className="font-medium">Descripción rol</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Acciones</p>
          </div>
        </div>

        {rolesData.map((role, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {role.id_rol}
              </p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {role.nombre_rol}
              </p>
            </div>
            <div className="col-span-4 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {role.descripcion_rol}
              </p>
            </div>
            <ActionsMenu rowData={role} onActionComplete={fetchRoles} />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center py-4 w-100 ml-auto">
        <div className="py-4">
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              fetchRoles(1);
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
          onClick={() => fetchRoles(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 dark:border-form-strokedark dark:bg-form-input"
        >
          Anterior
        </button>
        <p className="text-sm">
          Página {currentPage} de {totalPages}
        </p>
        <button
          disabled={currentPage === totalPages}
          onClick={() => fetchRoles(currentPage + 1)}
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
            <FormAddRole
              onActionComplete={fetchRoles}
              onClose={handleCloseNewRole}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default RolesTable;
