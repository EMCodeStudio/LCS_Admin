import payload from "payload"
import { FieldHook } from "payload/types"

const getProductServicePrice: FieldHook = async ({ data, originalDoc }) => {
    try {
        let collection: string = ''
        if (data) {
            const prodcuctServiceFieldId = data.ProductoServicioPedido.value
            const discountField = data.DescuentoPedido
            const stateOfferField = data.OfertaPedido
            const stateApprovalField = data.AprobacionEstadoPedido
            if (data.TipoVentaPedido === 'product' && data.ProductoServicioPedido.relationTo === 'productos') {
                collection = 'productos'
            } else if (data.TipoVentaPedido === 'service' && data.ProductoServicioPedido.relationTo === 'servicios') {
                collection = 'servicios'
            }
            // console.log('COLLECTION NAME : ', collection)
            const responseProdServData = await payload.find({
                collection,
                where: {
                    id: prodcuctServiceFieldId
                }
            })
            if (data && stateApprovalField === 'approved') {
                const { PrecioProductoServicio } = originalDoc.DetallesPagoPedido
                return PrecioProductoServicio
            } else {
                if (responseProdServData.docs && responseProdServData.docs.length > 0) {

                    const resultPriceData = collection === 'productos' ?
                        responseProdServData.docs[0].PrecioProducto :
                        responseProdServData.docs[0].PrecioServicio

                    const prodServPriceData = Number(resultPriceData)
                    const validatedProdServDiscount = discountField > 0 && stateOfferField === 'apply' ? prodServPriceData * (1 - (discountField / 100)) : prodServPriceData
                    const totalProductServicePrice = Math.round(validatedProdServDiscount)
                    return totalProductServicePrice
                }
            }
        } else {
            console.log(`No se encontro el precio del ${collection === 'productos' ? 'Producto' : 'Servicio'}`)
        }



        /*   if (data.TipoVentaPedido === 'product') {
               const productResponse = await fetch(`${process.env.PAYLOAD_URL}/api/productos/${prodcuctServiceFieldId}`)
                   .then(response => response.json())
               const productPrice = productResponse.PrecioProducto
               return productPrice
           }
           if (data.TipoVentaPedido === 'service') {
               const serviceResponse = await fetch(`${process.env.PAYLOAD_URL}/api/servicios/${prodcuctServiceFieldId}`)
                   .then(response => response.json())
               const servicePrice = serviceResponse.PrecioServicio
               return servicePrice
           }*/

    } catch (error) {
        console.log('ERROR EN LA FUNCION getProductServicePrice: ', error)
    }
}
export default getProductServicePrice