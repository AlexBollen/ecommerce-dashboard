import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import RolesTable from '../../components/Roles/RolesTable';

const Roles = () => {
  return (
    <>
      <Breadcrumb pageName="Roles" />

      <div className="flex flex-col gap-10">
        <RolesTable />
      </div>
    </>
  );
};

export default Roles;
