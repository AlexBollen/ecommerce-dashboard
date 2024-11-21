import { Box, Stack } from '@mui/material';
import { PosCenterHelper } from './CenterHelper';
import { useEffect, useState } from 'react';
import { ProductPos } from '../../types/productsPos';
import { PosLateralHelper } from './LateralHelper';

export function PosView() {
  const [selectedProducts, setSelectedProducts] = useState<ProductPos[]>([]);
  const [selectedType, setSelectedType] = useState('V')

  const handleSelectProduct = (product: ProductPos) => {
    if (!selectedProducts.some((p) => p.id_producto === product.id_producto)) {
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        product,
      ]);
    }
  };

  useEffect(() => {
    console.log(selectedProducts)
  }, [selectedProducts])

  const handleTransactionType = (type: string) => {
    setSelectedType(type)
  }

  return (
    <Box
      sx={{
        bgcolor: 'var(--mui-palette-background-level1)',
        py: { xs: '8px', sm: '8px' },
        height: 'calc(100vh - 220px)',
        overflow: 'auto',
      }}
    >
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        spacing={2}
        sx={{ height: '100%' }}
      >
        <Box
          sx={{
            flex: '1 1 55%',
            width: { xs: '100%', lg: '50%' },
            height: '100%',
          }}
        >
          <PosCenterHelper onSelectProduct={handleSelectProduct} transactionType={handleTransactionType} />
        </Box>
        <Box
          sx={{
            flex: '1 1 45%',
            width: { xs: '100%', lg: '50%' },
            height: '100%',
          }}
        >
            <PosLateralHelper selectedProducts={selectedProducts} transactionType={selectedType} />
        </Box>
      </Stack>
    </Box>
  );
}
