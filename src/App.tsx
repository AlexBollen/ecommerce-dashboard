import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import ProtectedRoutes from './utils/ProtectedRoutes';
import { NotFound } from './pages/Authentication/NotFound';
import Inventory from './pages/Inventory/Inventory';
import ProductTransfer from './pages/Product-Transfer/ProductTransfer';
import BestSellingProduct from './pages/Reports/BestSellingProduct';
import LowQuantityProduct from './pages/Reports/LowQuantityProduct';
import ProductByMonth from './pages/Reports/ProductByMounth';
import ProductByMonthAndAgency from './pages/Reports/ProductByMounthAndAgency';
import BestCustomer from './pages/Reports/BestCustomer';
import Users from './pages/Settings/Users';
import SaleByDate from './pages/Reports/SaleByDate';
import Roles from './pages/Settings/Roles';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const isSignInPage = window.location.pathname === '/';
  const role = localStorage.getItem('role');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (isSignInPage) return <SignIn />;

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route
            path="*"
            element={
              <>
                <PageTitle title="404 Page Not Found" />
                <NotFound />
              </>
            }
          />
          <Route
            index
            element={
              <>
                <PageTitle title="Sign in | TailAdmin" />
                <SignIn />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ECommerce />
              </>
            }
          />
          <Route
            path="/calendar"
            element={
              <>
                <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Calendar />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Profile />
              </>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <>
                <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormElements />
              </>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <>
                <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormLayout />
              </>
            }
          />
          <Route
            path="/tables"
            element={
              <>
                <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Tables />
              </>
            }
          />
          <Route
            path="/inventory"
            element={
              <>
                <PageTitle title="Inventario | TailAdmin" />
                <Inventory />
              </>
            }
          />
          <Route
            path="/productTransfer"
            element={
              <>
                <PageTitle title="Transferencias Producto | TailAdmin" />
                <ProductTransfer />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Settings />
              </>
            }
          />
          {role === 'Gerente' && (
            <Route
              path="/users"
              element={
                <>
                  <PageTitle title="Usuarios | Store Online S.A." />
                  <Users />
                </>
              }
            />
          )}
          {role === 'Gerente' && (
            <Route
              path="/roles"
              element={
                <>
                  <PageTitle title="Roles | Store Online S.A." />
                  <Roles />
                </>
              }
            />
          )}
          <Route
            path="/chart"
            element={
              <>
                <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Chart />
              </>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <>
                <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Alerts />
              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
                <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Buttons />
              </>
            }
          />
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignIn />
              </>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignUp />
              </>
            }
          />
          {role === 'Gerente' && (
            <Route
              path="/BestSellingProduct"
              element={
                <>
                  <PageTitle title="Reporte uno | TailAdmin" />
                  <BestSellingProduct />
                </>
              }
            />
          )}
          {role === 'Gerente' && (
            <Route
              path="/LowQuantityProduct"
              element={
                <>
                  <PageTitle title="Reporte dos | TailAdmin" />
                  <LowQuantityProduct />
                </>
              }
            />
          )}
          {role === 'Gerente' && (
            <Route
              path="/ProductByMonth"
              element={
                <>
                  <PageTitle title="Reporte tres | TailAdmin" />
                  <ProductByMonth />
                </>
              }
            />
          )}
          {role === 'Gerente' && (
            <Route
              path="/ProductByMonthAndAgency"
              element={
                <>
                  <PageTitle title="Reporte cuatro | TailAdmin" />
                  <ProductByMonthAndAgency />
                </>
              }
            />
          )}
          {role === 'Gerente' && (
            <Route
              path="/BestCustomer"
              element={
                <>
                  <PageTitle title="Reporte cinco | TailAdmin" />
                  <BestCustomer />
                </>
              }
            />
          )}
          {role === 'Gerente' && (
            <Route
              path="/SaleByDate"
              element={
                <>
                  <PageTitle title="Reporte seis | TailAdmin" />
                  <SaleByDate />
                </>
              }
            />
          )}
        </Route>
      </Routes>
    </DefaultLayout>
  );
}

export default App;
