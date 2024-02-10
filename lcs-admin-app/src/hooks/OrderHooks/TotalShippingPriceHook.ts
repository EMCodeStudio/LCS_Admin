import { FieldHook } from "payload/types"
import { LocationPriceType, UbicacionInterface } from "../../interfaces/OrderInterfaces/OrderLocationInterface"
import payload from "payload"



const getTotalShippingOrder: FieldHook = async ({ data, originalDoc }) => {

    try {

        if (data && data.TipoVentaPedido === 'product') {
            const { CantidadProductoPedido } = data.DetallesPagoPedido
            const stateApprovalField = data.AprobacionEstadoPedido
            //console.log('CANTIDAD Y PRECIO ENVIO: ', CantidadProductoPedido)
            if (stateApprovalField === 'approved') {
                const { TotalEnvioPedido } = originalDoc.DetallesPagoPedido
                //console.log('PRECIO TOTAL ENVIO ORIGEN: ', TotalEnvioPedido)
                return TotalEnvioPedido
            } else {

                const clientLocactionFieldId = data.ClienteIdPedido
                const clientLocationResponse = await payload.findByID({
                    collection: 'clientes',
                        id: clientLocactionFieldId
                })
                let clientLocationData: unknown
                if (clientLocationResponse) {
                    clientLocationData = clientLocationResponse.UbicacionCliente

                    const formatLocationPriceData = (ubicacionCliente: UbicacionInterface): number => {
                        const { value } = ubicacionCliente
                        return value.PrecioEnvioUbicacion
                    }
                    
                    let locationPrice: LocationPriceType = 0
                    if (clientLocationData) {
                        const getLocationPrice = formatLocationPriceData(clientLocationData as UbicacionInterface)
                        locationPrice = getLocationPrice
                        const totalShippingPrice = Number(CantidadProductoPedido * locationPrice)
                        return totalShippingPrice
                    }
                }
            }
        }
    } catch (error) {
        console.log('Error en la Funcion getTotalShippingOrder :', error)
    }

}



export default getTotalShippingOrder
