import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Grid2,
  Stack,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { ProductPos } from '../../types/productsPos';
import api from '../../utils/api';
import { ClientSelect } from './ClientSelect';
import { Customer } from '../../types/customer';

type LateralHelperProps = {
  selectedProducts: ProductPos[];
  transactionType: string;
};

export function PosLateralHelper({
  selectedProducts,
  transactionType,
}: LateralHelperProps) {
  const [products, setProducts] = useState<ProductPos[]>([]);
  const user = localStorage.getItem('sub');
  const userId = user ? parseInt(user, 10) : null;
  const [customer, setCustomer] = useState<Customer>();

  useEffect(() => {
    setProducts(
      selectedProducts.map((product) => ({
        ...product,
        quantity: product.quantity || 1,
      })),
    );
  }, [selectedProducts]);

  const handleQuantityChange = (id_producto: number, newQuantity: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id_producto === id_producto
          ? { ...product, quantity: newQuantity }
          : product,
      ),
    );
  };

  const total = products.reduce(
    (sum, product) => sum + product.precio_venta * product.quantity,
    0,
  );

  const handleSubmit = async () => {
    try {
      if (customer !== undefined && customer !== null && products.length) {
        const data = {
          monto_total: total,
          cliente: customer?.id_cliente ?? null,
          sucursal: 1,
          usuario: userId ?? null,
          lista_productos: products.map((product) => [
            product.id_producto,
            product.quantity,
          ]),
          tipo_transaccion: transactionType === 'V' ? true : false,
        };
        const response = await api.post('/quotes', data);
        if (response.status === 201) {
          console.log('todo bien');
        }
      } else {
        console.log('Algo salio mal')
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCustomerSelect = (selectedCustomer: any) => {
    setCustomer(selectedCustomer);
  };

  return (
    <Card
      className="dark:bg-boxdark"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
      }}
    >
      <CardContent
        style={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          gap: '16px',
          height: '100%',
        }}
      >
        <div>
          <Grid container spacing={3} alignItems="center">
            <Grid item md={6} xs={6}>
              <Typography
                variant="h3"
                sx={{ textAlign: 'left', color: 'white' }}
              >
                {new Intl.NumberFormat('es-GT', {
                  style: 'currency',
                  currency: 'GTQ',
                  minimumFractionDigits: 2,
                }).format(total)}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: '8px' }} />
          <Grid2 container spacing={2}>
            <Grid item md={12} xs={12}>
              <ClientSelect onCustomerSelect={handleCustomerSelect} />
            </Grid>
          </Grid2>
        </div>

        <div style={{ overflowY: 'auto' }}>
          <Box
            sx={{
              overflowX: 'auto',
              '--mui-palette-TableCell-border': 'transparent',
            }}
          >
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-1 flex items-center">
                  <p className="font-medium text-white">#</p>
                </div>
                <div className="col-span-3 hidden items-center sm:flex">
                  <p className="font-medium text-white">Producto</p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="font-medium text-white">Cantidad</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="font-medium text-white">Precio</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="font-medium text-white">Total</p>
                </div>
              </div>

              {products.map((product, index) => (
                <div
                  className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                  key={product.id_producto}
                >
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      {index + 1}
                    </p>
                  </div>
                  <div className="col-span-3 hidden items-center sm:flex">
                    <p className="text-sm text-black dark:text-white">
                      {product.nombre_producto}
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <input
                      type="number"
                      value={product.quantity}
                      style={{ width: '80px', textAlign: 'center' }}
                      min={1}
                      max={product.existences || 100}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10) || 1;
                        handleQuantityChange(product.id_producto, value);
                      }}
                    />
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      Q
                      {new Intl.NumberFormat('es-GT').format(
                        product.precio_venta,
                      )}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm text-black dark:text-white">
                      Q
                      {new Intl.NumberFormat('es-GT').format(
                        product.precio_venta * product.quantity,
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Box>
        </div>

        {/* Botones */}
        {products.length > 0 && (
          <Stack spacing={1} sx={{ p: 0, zIndex: 1 }}>
            <Grid container spacing={2}>
              {transactionType === 'V' && (
                <>
                  <Grid item xs={3} />
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleSubmit}
                    >
                      Generar venta
                    </Button>
                  </Grid>
                  <Grid item xs={3} />
                </>
              )}
              {transactionType === 'C' && (
                <>
                  <Grid item xs={3} />
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleSubmit}
                    >
                      Generar cotización
                    </Button>
                  </Grid>
                  <Grid item xs={3} />
                </>
              )}
            </Grid>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
