import React, { useState } from 'react';
import { CreateProductTransferDto, TransferDetail } from '../../types/transfer';

const TransferForm = ({ onSubmit }: { onSubmit: (data: CreateProductTransferDto) => void }) => {
  const [formData, setFormData] = useState<CreateProductTransferDto>({
    descripcion_transferencia: '',
    sucursal_saliente: 0,
    sucursal_Entrante: 0,
    id_estado_transferencia: 0,
    id_usuario: 1,
    detalles: [],
  });

  const handleAddProduct = () => {
    setFormData((prev) => ({
      ...prev,
      detalles: [...prev.detalles, { cantidad_transferencia: 0 }],
    }));
  };

  const handleProductChange = (index: number, value: number) => {
    const updatedDetalles = [...formData.detalles];
    updatedDetalles[index].cantidad_transferencia = value;
    setFormData({ ...formData, detalles: updatedDetalles });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Descripción"
        value={formData.descripcion_transferencia}
        onChange={(e) => setFormData({ ...formData, descripcion_transferencia: e.target.value })}
      />
      {}
      <button type="button" onClick={handleAddProduct}>
        Agregar Producto
      </button>
      {formData.detalles.map((detalle, index) => (
        <input
          key={index}
          type="number"
          placeholder="Cantidad de transferencia"
          value={detalle.cantidad_transferencia}
          onChange={(e) => handleProductChange(index, parseInt(e.target.value, 10))}
        />
      ))}
      <button type="submit">Guardar Transferencia</button>
    </form>
  );
};

export default TransferForm;
