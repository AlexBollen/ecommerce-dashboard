import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import InventoryTable from '../../components/Inventory/InventoryTable';
import { useState } from 'react';
import ListTransferTable from '../../components/TransferProduct/TransferTable'

const ProductTransfer = () => {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-2xl font-semibold text-black dark:text-white mb-6">
        Transferencias de Productos
      </h2>
      <ListTransferTable />
    </div>
  );
};

export default ProductTransfer;
