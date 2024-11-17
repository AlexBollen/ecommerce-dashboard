export interface TransferDetail {
    id_detalle_transferencia?: number;
    cantidad_transferencia: number;
  }
  
  export interface CreateProductTransferDto {
    descripcion_transferencia: string;
    sucursal_saliente: number;
    sucursal_Entrante: number;
    id_estado_transferencia: number;
    id_usuario: number;
    detalles: TransferDetail[];
  }
  