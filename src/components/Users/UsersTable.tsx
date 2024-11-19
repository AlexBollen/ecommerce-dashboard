import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { User } from '../../types/user';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent } from '@mui/material';
import FormAddUser from './FormAddUser';
import ActionsMenu from './ActionsMenu';

const UsersTable = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [newMode, setNewMode] = useState(false);

  const fetchUsers = async (page = 1) => {
    try {
      const response = await api.get('/users', {
        params: { page: page, limit: pageSize },
      });
      setUsersData(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [pageSize]);

  const handleNewUser = () => {
    setNewMode(true);
  };

  const handleCloseNewUser = () => {
    setNewMode(false)
  }

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-start justify-between py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Usuarios
          </h4>
          <div className="flex w-full max-w-45 justify-end">
            <Link
              to="#"
              onClick={handleNewUser}
              className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-5"
            >
              Agregar
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Empleado</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Username</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Rol</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Acciones</p>
          </div>
        </div>

        {usersData.map((user, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-3 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {user.nombre_persona}
              </p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {user.username}
              </p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {user.role.nombre_rol}
              </p>
            </div>
            <div className="flex items-center space-x-3.5">
              <ActionsMenu rowData={user} onActionComplete={fetchUsers} />
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
            <FormAddUser onActionComplete={fetchUsers} onClose={handleCloseNewUser}/>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default UsersTable;
