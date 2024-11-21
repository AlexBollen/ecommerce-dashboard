import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SaleByDateTable from '../../components/Reports/SaleByDate';
import DatePickerOneReport from '../../components/Reports/Filters/SelectDate';
import DatePickerTwoReport from '../../components/Reports/Filters/SelectDateTwo';
const SaleByDate = () => {
  return (
    <>
      <Breadcrumb pageName="Ventas" />

      <div className="flex flex-col gap-10">
        <DatePickerOneReport/>
        <DatePickerTwoReport/>
        <SaleByDateTable /> 
      </div>
    </>
  );
};

export default SaleByDate;
