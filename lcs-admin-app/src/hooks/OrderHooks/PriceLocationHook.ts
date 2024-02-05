import payload from "payload";
import { FieldHook } from "payload/types";
import { LocationPriceType, UbicacionInterface } from "../../interfaces/OrderInterfaces/OrderLocationInterface";

const getLocationPrice: FieldHook = async ({ data, originalDoc }) => {
    try {
        if (data) {

            const clientLocactionFieldId = data.ClienteIdPedido
            const stateApprovalField = data.AprobacionEstadoPedido

            const clientLocationResponse = await payload.find({
                collection: 'clientes',
                where: {
                    id: clientLocactionFieldId
                }
            })

            if (stateApprovalField === 'approved') {
                const { PrecioEnvioPedido } = originalDoc.DetallesPagoPedido
                return PrecioEnvioPedido
            } else {
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