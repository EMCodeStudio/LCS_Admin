import payload from "payload";
import { FieldHook } from "payload/types";



const getProdServUnitPrice: FieldHook = async ({ data, originalDoc }) => {

    try {
        let collection: string = ''

        if (data) {

            const prodcuctServiceFieldId = data.ProductoServicioPedido.value
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

            if (stateApprovalField === 'approved') {
                const  PrecioProductoServicioUnidad  = originalDoc.PrecioProductoServicioUnidad
                console.log('PRECIO UNIDAD ORIGEN: ', PrecioProductoServicioUnidad)
                return PrecioProductoServicioUnidad
            } else {
                if (responseProdServData.docs && responseProdServData.docs.length > 0) {
                    const resultPriceData = collection === 'productos' ?
                        responseProdServData.docs[0].PrecioProducto :
                        responseProdServData.docs[0].PrecioServicio
                    const prodServPriceData = Number(resultPriceData)
                    return prodServPriceData
                }
            }
        } else {
            console.log(`No se encontro el precio del ${collection === 'productos' ? 'Producto' : 'Servicio'}`)
        }
    } catch (error) {
        console.log('ERROR EN LA FUNCION getProductServicePrice: ', error)
    }
    return 0
}

export default getProdServUnitPrice