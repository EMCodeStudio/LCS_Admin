import payload from "payload";
import { FieldHook } from "payload/types";
import { LocationPriceType, UbicacionInterface } from "../../interfaces/OrderInterfaces/OrderLocationInterface";

const getLocationPrice: FieldHook = async ({ data, originalDoc }) => {
    try {
        if (data) {
            const clientLocactionFieldId = data.ClienteIdPedido
            const stateApprovalField = data.AprobacionEstadoPedido
            // console.log('FIELD ID CLIENTE:', clientLocactionFieldId)
            const clientLocationResponse = await payload.find({
                collection: 'clientes',
                where: {
                    id: clientLocactionFieldId
                }
            })
            // console.log('DATA CLIENTE:', clientLocationResponse)
            if (stateApprovalField === 'approved') {
                const { PrecioEnvioPedido } = originalDoc.DetallesPagoPedido
                return PrecioEnvioPedido
            } else {

                if (clientLocationResponse.docs && clientLocationResponse.docs.length > 0) {
                    const clientLocationData = clientLocationResponse.docs[0].UbicacionCliente
                    //console.log('DATA CLIENTE UBICACION:', clientLocationData)
                    const formatLocationPriceData = (ubicacionCliente: UbicacionInterface): number => {
                        const { PrecioEnvioUbicacion } = ubicacionCliente
                        return PrecioEnvioUbicacion
                    }
                    let locationDataNumber: LocationPriceType = 0
                    if (clientLocationData) {
                        const getLocationPrice = formatLocationPriceData(clientLocationData as UbicacionInterface)
                        locationDataNumber = getLocationPrice
                        //console.log('PRECIO DE ENVIO:', locationDataNumber)
                        return locationDataNumber
                    }
                }

            }
        }
    } catch (error) {
        console.log('Error en la Funcion getLocationPrice :', error)
    }
}
export default getLocationPrice