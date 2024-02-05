import { FieldHook } from "payload/types"
import { LocationPriceType, UbicacionInterface } from "../../interfaces/OrderInterfaces/OrderLocationInterface"
import payload from "payload"



const getTotalShippingOrder: FieldHook = async ({ data, originalDoc }) => {

    try {

        if (data && data.TipoVentaPedido === 'product') {
            const { CantidadProductoPedido, PrecioEnvioPedido } = data.DetallesPagoPedido
            const stateApprovalField = data.AprobacionEstadoPedido
            console.log('CANTIDAD Y PRECIO ENVIO: ', CantidadProductoPedido, ' y ', PrecioEnvioPedido)
            if (stateApprovalField === 'approved') {
                const { TotalEnvioPedido } = originalDoc.DetallesPagoPedido
                console.log('PRECIO TOTAL ENVIO ORIGEN: ', TotalEnvioPedido)
                return TotalEnvioPedido
            } else {

                const clientLocactionFieldId = data.ClienteIdPedido
                const clientLocationResponse = await payload.find({
                    collection: 'clientes',
                    where: {
                        id: clientLocactionFieldId
                    }
                })
                if (clientLocationResponse.docs && clientLocationResponse.docs.length > 0) {
                    const clientLocationData = clientLocationResponse.docs[0].UbicacionCliente
                   
                    const formatLocationPriceData = (ubicacionCliente: UbicacionInterface): number => {
                        const { value } = ubicacionCliente
                        return value.PrecioEnvioUbicacion
                    }
                    let locationDataNumber: LocationPriceType = 0

                    if (clientLocationData) {
                        const getLocationPrice = formatLocationPriceData(clientLocationData as UbicacionInterface)
                        locationDataNumber = getLocationPrice
                       const totalShippingPrice = Number(CantidadProductoPedido * locationDataNumber)
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
