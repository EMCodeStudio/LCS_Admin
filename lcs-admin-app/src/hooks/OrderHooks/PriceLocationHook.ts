import payload from "payload"
import { FieldHook } from "payload/types"
import { LocationPriceType, UbicacionInterface } from "../../interfaces/OrderInterfaces/OrderLocationInterface"


const getLocationPrice: FieldHook = async ({ data, originalDoc }) => {
    try {
        if (data) {
            const clientLocactionFieldId = data.ClienteIdPedido
            const stateApprovalField = data.AprobacionEstadoPedido
            const clientLocationResponse = await payload.findByID({
                collection: 'clientes',
                id: clientLocactionFieldId
            })
            //console.log('DATA CLIENTE:', clientLocationResponse)


            if (stateApprovalField === 'approved') {
                const { PrecioEnvioPedido } = originalDoc.DetallesPagoPedido
                return PrecioEnvioPedido
            } else {


                let clientLocationData: unknown
                if (clientLocationResponse) {
                    clientLocationData = clientLocationResponse.UbicacionCliente
                    //console.log('DATA CLIENTE UBICACION:', clientLocationData)
                    const formatLocationPriceData = (ubicacionCliente: UbicacionInterface): number => {
                        const { value } = ubicacionCliente
                        const ShippingPrice = value.PrecioEnvioUbicacion
                        //console.log('FORMAT CLIENTE PRECIO UBICACION:', ShippingPrice)
                        return ShippingPrice
                    }


                    let locationDataNumber: LocationPriceType = 0
                    let getLocationPrice: LocationPriceType = 0
                    if (clientLocationData) {
                        getLocationPrice = formatLocationPriceData(clientLocationData as UbicacionInterface)
                        locationDataNumber = Number(getLocationPrice)
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