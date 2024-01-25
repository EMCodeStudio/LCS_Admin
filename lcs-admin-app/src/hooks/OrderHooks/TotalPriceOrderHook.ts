import payload from "payload"
import { FieldHook } from "payload/types"

const getTotalPrice: FieldHook = async ({ data, originalDoc }) => {
    try {
        if (data) {
            const productServiceFieldID = data.ProductoServicioPedido.value
            // const fieldProductServiceTotalPrice = data.TotalPricioPedido
            // const fieldProductServiceTotalPriceOrigin = originalDoc.TotalPricioPedido
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
            if (productServiceResponse.docs && productServiceResponse.docs.length > 0) {

                const productServicePrice = collection === 'productos' ?
                    productServiceResponse.docs[0].PrecioProducto :
                    productServiceResponse.docs[0].PrecioServicio

                const { CantidadProductoPedido } = data.DetallesPagoPedido
                PrecioProductoServicio = Number(productServicePrice)
                const calculatedProductPrice = CantidadProductoPedido > 0 ? CantidadProductoPedido * PrecioProductoServicio : PrecioProductoServicio
                const validatedProdServDiscount = data.DescuentoPedido > 0 && data.OfertaPedido === 'apply' ? calculatedProductPrice * (1 - (data.DescuentoPedido / 100)) : collection === 'productos' ? calculatedProductPrice : PrecioProductoServicio

                const totalProductServicePrice = Math.round(validatedProdServDiscount)
                return totalProductServicePrice
            } else {
                console.log(`No se Calculo el Precio Total del ${collection === 'productos' ? 'Producto' : 'Servicio'}`)
            }
        }
    } catch (error) {
        console.log('ERROR EN LA FUNCION getTotalPrice: ', error)
    }
}

export default getTotalPrice