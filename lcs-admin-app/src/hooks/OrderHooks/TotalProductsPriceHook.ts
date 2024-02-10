import { FieldHook } from "payload/types"

const getTotalProductsOrder: FieldHook = ({ data, originalDoc }) => {

    if (data && data.TipoVentaPedido === 'product') {
        const { CantidadProductoPedido, PrecioProductoServicio } = data.DetallesPagoPedido
        const stateApprovalField = data.AprobacionEstadoPedido
        if (stateApprovalField === 'approved') {
            const { TotalProductosPedido } = originalDoc.DetallesPagoPedido
            //console.log('PRECIO TOTAL PROD SERV ORIGEN: ', TotalProductosPedido)
            return TotalProductosPedido
        } else {
            if (!isNaN(CantidadProductoPedido) && !isNaN(PrecioProductoServicio)) {
                if (CantidadProductoPedido > 0 && PrecioProductoServicio !== 0) {
                const totalProductsPrice = Number(CantidadProductoPedido * PrecioProductoServicio)
                    if (!isNaN(totalProductsPrice)) {
                        return totalProductsPrice
                    } else {
                        console.error("El cálculo resultó en NaN. Revisa los valores de CantidadProductoPedido y PrecioProductoPedido.")
                    }
                } else {
                    console.error("CantidadProductoPedido debe ser mayor que cero y PrecioProductoPedido no debe ser cero.")
                }
            } else {
                console.error("CantidadProductoPedido y PrecioProductoPedido deben ser números válidos.")
            }
        }
    }
  
}

export default getTotalProductsOrder
