import payload from "payload"
import { CollectionBeforeChangeHook } from "payload/types"

const updateProductStock: CollectionBeforeChangeHook = async ({ data }) => {
    try {
        const { CantidadProductoPedido } = data.DetallesPagoPedido
        const stateOrderPayment = data.EstadoPagoPedido
        const stateOrderApproved = data.EstadoCompraPedido
        const isOrderApproved = data.AprobacionEstadoPedido
       // console.log('FIELD  ORDER APROBACION updateProductStock: ', isOrderApproved)
        if (CantidadProductoPedido > 0 && stateOrderPayment === 'paid') {
            const productFieldId = data.ProductoServicioPedido.value
            const collectionName = 'productos'
            const productResponse = await payload.find({
                collection: collectionName,
                where: {
                    id: {
                        equals: productFieldId
                    }
                }
            })
            if (productResponse.docs && productResponse.docs.length > 0) {
                const resultProductId = productResponse.docs[0].id
                const resultProductStock = productResponse.docs[0].CantidadProducto
                //const countStockNumber = resultProductStock as number
                const countStockNumber = Number(resultProductStock)
                if (stateOrderApproved && isOrderApproved === 'notApproved') {
                    data.AprobacionEstadoPedido = 'approved'
                    if (countStockNumber >= CantidadProductoPedido) {
                        const newStock = countStockNumber - CantidadProductoPedido
                        await payload.update({
                            collection: 'productos',
                            id: resultProductId,
                            data: {
                                CantidadProducto: newStock
                            },
                        })
                        //console.log('Producto Stock Actualizado.')
                    } else {
                        console.log('CANTIDAD SOLICITADA SUPERA EL STOCK DISPONIBLE!.')
                    }
                } else {
                    console.log('DEBE MARCAR LA CASILLA DE APROBACION!.')
                }
            }
            else {
                console.log('Producto no encontrado en la funcion updateProductStock.')
            }
        } else {
            console.log('DEBE AGREGAR UNA CANTIDAD Y CAMBIAR EL ESTADO DE PAGO A REALIZADO')
        }
    } catch (error) {
        console.log('ERROR EN LA FUNCION updateProductStock: ', error)
    }
}
export default updateProductStock