import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';
import { Agency } from '../../../types/agency';

const SelectGroupAgencyAndMonth = ({
  onChange,
}: {
  onChange: (agency: number) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');  
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false); 
  const [agencies, setAgencies] = useState<Agency[]>([]);  

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    changeTextColor();
    onChange(parseInt(e.target.value));  // Llama a la función `onChange` con el valor seleccionado
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/agencies');  // Obtiene las agencias desde la API
      setAgencies(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-white dark:text-white">Sucursal</label>

      <div className="relative z-20 bg-transparent white:bg-form-input">
        <select
          value={selectedOption}
          onChange={handleChange}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input white:focus:border-primary ${
            isOptionSelected ? 'text-white dark:text-white' : ''
          }`}
        >
          <option value={0} className="text-body white:text-bodydark">
            Todos
          </option>
          {agencies.map((agency) => (
            <option
              key={agency.id_sucursal}
              value={agency.id_sucursal}
              className="text-body white:text-bodydark"
            >
              {agency.nombre_sucursal}
            </option>
          ))}
        
          <option value={-1} className="text-body white:text-bodydark">
            Mes
          </option>
        </select>

        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SelectGroupAgencyAndMonth;
