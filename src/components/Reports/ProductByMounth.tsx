import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const ChartProductByMonth = () => {
  const [data, setData] = useState<any>([]);
  const [chartData, setChartData] = useState<any>({});

  const months = [
    'Enero', 'Febrebro', 'Marzo', 'Abril', 'Mayo', 'Junio', 
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
      const response = await fetch('/detail-quotes/top-product-by-month'); 
      const data = await response.json();
      
     
      const processedData: { [key: string]: number[] } = {};

      
      data.forEach((item: any) => {
        const { nombre_producto, mes, total_vendido } = item;
        const monthIndex = months.indexOf(mes);

        if (!processedData[nombre_producto]) {
          processedData[nombre_producto] = new Array(12).fill(0); 
        }

        processedData[nombre_producto][monthIndex] = parseInt(total_vendido);
      });

      const series = Object.keys(processedData).map((product) => ({
        name: product,
        data: processedData[product],
      }));

      setChartData({ series });
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container">
      <h2>Ventas por Producto y Mes</h2>
      <ReactApexChart options={options} series={chartData.series || []} type="bar" height={350} />
    </div>
  );
};

export default ChartProductByMonth;
