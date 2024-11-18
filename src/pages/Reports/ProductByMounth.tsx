import ChartProductByMonth from '../../components/Reports/ProductByMounth';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const ProductByMonth = () => {
  return (
    <>
      <Breadcrumb pageName="Productos" />

      <div className="flex flex-col gap-10">
        <ChartProductByMonth /> 
      </div>
    </>
  );
};
export default ProductByMonth;