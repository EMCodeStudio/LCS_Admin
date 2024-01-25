import { FieldHook } from "payload/types"

const validatedStockApproval: FieldHook = async ({ data, originalDoc }) => {
    if (data && data.AprobacionEstadoPedido === 'approved') {
        const { CantidadProductoPedido } = originalDoc.DetallesPagoPedido
        return CantidadProductoPedido
    }
}

const validatedPaymentApproval: FieldHook = async ({ data, originalDoc }) => {
    if (data && data.AprobacionEstadoPedido === 'approved') {
        const  paymentStatement  = originalDoc.EstadoPagoPedido
        return paymentStatement
    }
}


export  {validatedStockApproval, validatedPaymentApproval}