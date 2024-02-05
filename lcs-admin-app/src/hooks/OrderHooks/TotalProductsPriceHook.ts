import { FieldHook } from "payload/types"

const getTotalProductsOrder: FieldHook = async ({ data, originalDoc }) => {
    if (data && data.TipoVentaPedido === 'product') {
        const { CantidadProductoPedido, PrecioProductoServicio } = data.DetallesPagoPedido
        //console.log("Cantidad Producto Pedido: ", CantidadProductoPedido)
        //console.log("Precio Producto Pedido: ", PrecioProductoServicio)

        if (!isNaN(CantidadProductoPedido) && !isNaN(PrecioProductoServicio)) {
            if (CantidadProductoPedido > 0 && PrecioProductoServicio !== 0) {
                let totalProductsPrice = Number(CantidadProductoPedido * PrecioProductoServicio)
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
    return 0
}

export default getTotalProductsOrder
