import { FieldHook } from "payload/types";

const getTotalShippingOrder: FieldHook = async ({ data, originalDoc }) => {
    if (data && data.TipoVentaPedido === 'product') {
        const { CantidadProductoPedido, PrecioEnvioPedido } = data.DetallesPagoPedido
        //console.log("Cantidad Producto Pedido: ", CantidadProductoPedido)
        //console.log("Precio Envio Pedido: ", PrecioEnvioPedido)

        if (!isNaN(CantidadProductoPedido) && !isNaN(PrecioEnvioPedido)) {
            if (CantidadProductoPedido > 0 && PrecioEnvioPedido !== 0) {
                let totalShippingPrice = Number(CantidadProductoPedido * PrecioEnvioPedido)
                if (!isNaN(totalShippingPrice)) {
                    return totalShippingPrice;
                } else {
                    console.error("El cálculo resultó en NaN. Revisa los valores de CantidadProductoPedido y PrecioEnvioPedido.");
                }
            } else {
                console.error("CantidadProductoPedido debe ser mayor que cero y PrecioEnvioPedido no debe ser cero.")
            }
        } else {
            console.error("CantidadProductoPedido y PrecioEnvioPedido deben ser números válidos.")
        }
    }
    return 0
}

export default getTotalShippingOrder
