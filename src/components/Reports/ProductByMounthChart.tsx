import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ProductByMonthC } from '../../types/productByMonthC'; 
import { ApexOptions } from 'apexcharts';
import api from '../../utils/api';

const ChartProductByMonth = () => {
  const [data, setData] = useState<ProductByMonthC[]>([]);
  const [chartData, setChartData] = useState<{ series: any[] }>({ series: [] });

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    xaxis: {
      categories: months,
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'top',
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<ProductByMonthC[]>('/detail-quotes/top-product-by-month');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const processedData: { [key: string]: number[] } = {};

      data.forEach((item) => {
        const { nombre_producto, mes, cantidad } = item; 
        const monthIndex = months.indexOf(mes);

        
        if (monthIndex !== -1) {
          if (!processedData[nombre_producto]) {
            processedData[nombre_producto] = new Array(12).fill(0);
          }
          processedData[nombre_producto][monthIndex] = cantidad; 
        }
      });

   
      const series = Object.keys(processedData).map((product) => ({
        name: product,
        data: processedData[product],
      }));

      setChartData({ series }); 
    }
  }, [data]);

  return (
    <div className="chart-container">
      <h2>Ventas por Producto y Mes</h2>
      <ReactApexChart options={options} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

export default ChartProductByMonth;
