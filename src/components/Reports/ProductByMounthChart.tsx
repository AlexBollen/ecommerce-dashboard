import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import axios from 'axios';
import api from '../../utils/api';

const SalesByProductChart: React.FC = () => {
  const [chartData, setChartData] = useState<{ series: any[]; months: string[] }>({
    series: [],
    months: [],
  });

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];

  const fetchSalesData = async () => {
    try {
      const response = await api.get('detail-quotes/top-product-by-month');
      const salesData = response.data;

      const salesMap: { [productName: string]: number[] } = {};

      salesData.forEach((sale: any) => {
        const monthIndex = sale.nm - 1;
        if (!salesMap[sale.nombre_producto]) {
          salesMap[sale.nombre_producto] = new Array(12).fill(0); 
        }
        salesMap[sale.nombre_producto][monthIndex] = parseInt(sale.total_vendido, 10); 
      });

      const seriesData = Object.keys(salesMap).map((product) => ({
        name: product,
        data: salesMap[product],
      }));

      setChartData({
        series: seriesData,
        months: monthNames,
      });
    } catch (error) {
      console.error('Error al obtener los datos de ventas:', error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: chartData.months, 
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE', '#3e5b94'], 
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
  };

  return (
    <div className="chart-container">
      <h2>Ventas por Producto y Mes</h2>
      <ReactApexChart options={chartOptions} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

export default SalesByProductChart;
