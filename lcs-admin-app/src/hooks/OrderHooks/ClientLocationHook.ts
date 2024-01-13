import { FieldHook } from "payload/types"
import { LocationData, Ubicacion } from "../../interfaces/OrderInterfaces/OrderLocationInterface"
import payload from "payload"


const getClientLocation: FieldHook = async ({ data, }) => {
    try {
        if (data) {
            const clientFieldId = data.ClienteIdPedido
            const locationProdServField = data.UbicacionProductoServicioPedido
            const responseClientLocation = await payload.find({
                collection: 'clientes',
                where: {
                    id: clientFieldId
                }
            })
            if (responseClientLocation.docs && responseClientLocation.docs.length > 0) {
                let locationDataString: LocationData = ''
                const clientLocationData = responseClientLocation.docs[0].UbicacionCliente
                //console.log('CLIENTE ORDER DATA LOCATION: ', clientLocationData)
                const formatLocationData = (ubicacionCliente: Ubicacion): string => {
                    const { PaisUbicacion, DepartamentoUbicacion, MunicipioUbicacion } = ubicacionCliente
                    return `${PaisUbicacion} - ${DepartamentoUbicacion.NombreDepartamento} - ${MunicipioUbicacion.NombreMunicipio}`
                }
                if (clientLocationData) {
                    const getLocationFormatString = formatLocationData(clientLocationData as Ubicacion)
                    locationDataString = getLocationFormatString
                    //console.log('CLIENTE ORDER LOCATION FORMATED: ', locationDataString)
                }
                if (locationDataString) {
                    const valueCaseClientLocation = locationDataString
                    //console.log('CLIENTE LOCATION LOWER: ', valueCaseClientLocation)
                    //console.log('PROD and SERV  LOCATION LOWER: ', locationProdServField)
                    const foundedClientLocation = locationProdServField.includes(valueCaseClientLocation)
                    if (foundedClientLocation) {
                        return `Coincidencia: ${locationDataString}`
                    }
                    return 'La Ubicacion de Venta No Coincide con la del Cliente.'
                } else {
                    return 'Ubicacion del Cliente No Encontrada.'
                }
            }
        }
    } catch (error) {
        console.log('ERROR EN LA FUNCION getClientLocation:', error)
    }
}

export default getClientLocation