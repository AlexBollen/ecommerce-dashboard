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
import HistoricalSales from './pages/Reports/HistoricalSales';
import Roles from './pages/Settings/Roles';
import POS from './pages/POS/POS';

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
                <PageTitle title="Sign in | Store Online S.A." />
                <SignIn />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <PageTitle title="eCommerce Dashboard | Store Online S.A." />
                <ECommerce />
              </>
            }
          />
          <Route
            path="/calendar"
            element={
              <>
                <PageTitle title="Calendar | Store Online S.A." />
                <Calendar />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | Store Online S.A." />
                <Profile />
              </>
            }
          />
          <Route
            path="/pos"
            element={
              <>
                <PageTitle title="POS | Store Online S.A." />
                <POS />
              </>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <>
                <PageTitle title="Form Elements | Store Online S.A." />
                <FormElements />
              </>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <>
                <PageTitle title="Form Layout | Store Online S.A." />
                <FormLayout />
              </>
            }
          />
          <Route
            path="/tables"
            element={
              <>
                <PageTitle title="Tables | Store Online S.A." />
                <Tables />
              </>
            }
          />
          <Route
            path="/inventory"
            element={
              <>
                <PageTitle title="Inventario | Store Online S.A." />
                <Inventory />
              </>
            }
          />
          <Route
            path="/productTransfer"
            element={
              <>
                <PageTitle title="Transferencias Producto | Store Online S.A." />
                <ProductTransfer />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings | Store Online S.A." />
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
                <PageTitle title="Basic Chart | Store Online S.A." />
                <Chart />
              </>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <>
                <PageTitle title="Alerts | Store Online S.A." />
                <Alerts />
              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
                <PageTitle title="Buttons | Store Online S.A." />
                <Buttons />
              </>
            }
          />
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | Store Online S.A." />
                <SignIn />
              </>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Signup | Store Online S.A." />
                <SignUp />
              </>
            }
          />
          {role === 'Gerente' && (
            <Route
              path="/BestSellingProduct"
              element={
                <>
                  <PageTitle title="Reporte uno | Store Online S.A." />
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
                  <PageTitle title="Reporte dos | Store Online S.A." />
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
                  <PageTitle title="Reporte tres | Store Online S.A." />
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
                  <PageTitle title="Reporte cuatro | Store Online S.A." />
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
                  <PageTitle title="Reporte cinco | Store Online S.A." />
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
                  <PageTitle title="Reporte seis | Store Online S.A." />
                  <SaleByDate />
                </>
              }
            />
          )}
          {role === 'Gerente' && (
            <Route
              path="/HistoricalSales"
              element={
                <>
                  <PageTitle title="Reporte siete | Store Online S.A." />
                  <HistoricalSales />
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
