import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';
import { Agency } from '../../../types/agency';

const SelectGroupAgencyAndMonth = ({
  onChange,
}: {
  onChange: (agency: number, month: string) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>(''); 
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [agencies, setAgencies] = useState<Agency[]>([]);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const handleAgencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    changeTextColor();
    onChange(parseInt(e.target.value), selectedMonth); 
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
    onChange(parseInt(selectedOption), e.target.value); 
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/agencies');
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
          onChange={handleAgencyChange}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input white:focus:border-primary ${
            isOptionSelected ? 'text-white dark:text-white' : ''
          }`}
        >
          <option value={0} className="text-body white:text-bodydark">
            Todos
          </option>
          <option value={1} className="text-body white:text-bodydark">
            Mes
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
        </select>
      </div>

          
    </div>
  );
};

export default SelectGroupAgencyAndMonth;
