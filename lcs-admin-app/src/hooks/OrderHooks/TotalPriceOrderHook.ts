import payload from "payload"
import { FieldHook } from "payload/types"

const getTotalPriceOrder: FieldHook = async ({ data, originalDoc }) => {
    try {
        if (data) {
            const productServiceFieldID = data.ProductoServicioPedido.value
            const stateApprovalField = data.AprobacionEstadoPedido

            let collection = ''
            if (data.TipoVentaPedido === 'product' && data.ProductoServicioPedido.relationTo === 'productos') {
                collection = 'productos'
            } else if (data.TipoVentaPedido === 'service' && data.ProductoServicioPedido.relationTo === 'servicios') {
                collection = 'servicios'
            }
            const productServiceResponse = await payload.find({
                collection,
                where: {
                    id: productServiceFieldID
                }
            })

            let PrecioProductoServicio: number = 0

            if (stateApprovalField === 'approved') {
                const { TotalPricioPedido } = originalDoc.DetallesPagoPedido
                //console.log('PRECIO TOTAL PEDIDO ORIGEN: ', TotalPricioPedido)
                return TotalPricioPedido
            } else {
                if (productServiceResponse.docs && productServiceResponse.docs.length > 0) {

                    const productServicePrice = collection === 'productos' ?
                        productServiceResponse.docs[0].PrecioProducto :
                        productServiceResponse.docs[0].PrecioServicio

                    const { CantidadProductoPedido, PrecioEnvioPedido } = data.DetallesPagoPedido
                    PrecioProductoServicio = Number(productServicePrice)

                    const calculatedProductPrice = CantidadProductoPedido > 0 ? CantidadProductoPedido * PrecioProductoServicio : PrecioProductoServicio

                    const validatedProdServDiscount = data.DescuentoPedido > 0 && data.OfertaPedido === 'apply' ? calculatedProductPrice * (1 - (data.DescuentoPedido / 100)) : collection === 'productos' ? calculatedProductPrice : PrecioProductoServicio

                    const calculatedTotalShipping = CantidadProductoPedido ? CantidadProductoPedido * PrecioEnvioPedido : PrecioEnvioPedido

                    const validatedTotalPrice = collection === 'productos' ? validatedProdServDiscount + (calculatedTotalShipping ? calculatedTotalShipping : 0) : validatedProdServDiscount

                    const totalProductServicePrice = Math.round(validatedTotalPrice)

                    return totalProductServicePrice
                }
            }
        }
    } catch (error) {
        console.log('ERROR EN LA FUNCION getTotalPrice: ', error)
    }
    return 0
}

export default getTotalPriceOrder