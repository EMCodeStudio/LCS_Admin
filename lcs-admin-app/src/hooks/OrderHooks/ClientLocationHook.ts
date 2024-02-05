import { FieldHook } from "payload/types"
import { LocationType, UbicacionInterface } from "../../interfaces/OrderInterfaces/OrderLocationInterface"
import payload from "payload"

const getClientLocation: FieldHook = async ({ data, originalDoc }) => {
    try {
        if (data) {

            const clientFieldId = data.ClienteIdPedido
            // console.log('FIELD ID CLIENTE:', clientFieldId)

            const locationProdServField = data.UbicacionProductoServicioPedido
            // console.log('FIELD ID PRODUCT SERVICE UBICACION:', locationProdServField)

            const responseClientLocation = await payload.find({
                collection: 'clientes',
                where: {
                    id: clientFieldId
                }
            })
            //console.log('DATA CLIENTE:', responseClientLocation)

            let locationDataString: LocationType = ''

            if (responseClientLocation.docs && responseClientLocation.docs.length > 0) {

                const clientLocationData = responseClientLocation.docs[0].UbicacionCliente
                //console.log('DATA CLIENTE UBICACION:', clientLocationData)

                const formatLocationClient = (ubicacionCliente: UbicacionInterface): string => {
                    const { value } = ubicacionCliente
                    return `${value.PaisUbicacion} - ${value.DepartamentoUbicacion.NombreDepartamento} - ${value.MunicipioUbicacion.NombreMunicipio}`
                }
                if (clientLocationData) {
                    const getLocationFormatString = formatLocationClient(clientLocationData as UbicacionInterface)
                    locationDataString = getLocationFormatString
                    //console.log('FORMATED UBICACION CLIENTE:', locationDataString)
                }

                if (data.AprobacionEstadoPedido === 'approved') {
                    const locationClientData = originalDoc.UbicacionClientePedido
                    console.log('DATA CLIENTE UBICACION  RETURN ORIGEN: ', locationClientData)
                    return locationClientData
                } else {
                    if (locationDataString) {
                        const valueCaseClientLocation = locationDataString
                        const foundedClientLocation = locationProdServField.includes(valueCaseClientLocation)
                        //console.log('CLIENTE ENCONTRADO? :', foundedClientLocation)
                        if (foundedClientLocation) {
                            return `Coincidencia: ${locationDataString}`
                        } else {
                            return 'La Ubicacion de Venta No Coincide con la del Cliente.'
                        }
                    } else {
                        return 'Ubicacion del Cliente No Encontrada.'
                    }
                }
            }
        }
    } catch (error) {
        console.log('ERROR EN LA FUNCION getClientLocation:', error)
    }
}

export default getClientLocation