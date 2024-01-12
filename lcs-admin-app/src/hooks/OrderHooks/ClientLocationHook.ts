import { FieldHook } from "payload/types"
import { LocationData, Ubicacion } from "../../interfaces/OrderInterfaces/OrderLocationInterface"
import payload from "payload"

const getClientLocation: FieldHook = async ({ data }) => {
    try {
        if (data) {
            const clientFieldId = data.ClienteIdPedido
            const responseClientLocation = await payload.find({
                collection: 'clientes',
                where: {
                    id: clientFieldId
                }
            })
            if (responseClientLocation.docs && responseClientLocation.docs.length > 0) {
                let clientLocationData: LocationData = ''
                const clientDataLocation = responseClientLocation.docs[0].UbicacionCliente
                //console.log('CLIENTE ORDER DATA LOCATION: ', clientDataLocation)
                const formatLocationData = (ubicacionCliente: Ubicacion): string => {
                    const { PaisUbicacion, DepartamentoUbicacion, MunicipioUbicacion } = ubicacionCliente
                    return `${PaisUbicacion} - ${DepartamentoUbicacion.NombreDepartamento} - ${MunicipioUbicacion.NombreMunicipio}`
                }
                if (clientDataLocation) {
                    const getLocationFormatString = formatLocationData(clientDataLocation as Ubicacion)
                    clientLocationData = getLocationFormatString
                    //console.log('CLIENTE ORDER LOCATION FORMATED: ', clientLocationData)
                }
                if (clientLocationData) {
                    const lowerCaseClientLocation = clientLocationData
                    const lowerCaseGlobalLocation = data.UbicacionProductoServicioPedido
                    const foundClientLocation = lowerCaseGlobalLocation.includes(lowerCaseClientLocation)
                    if (foundClientLocation) {
                        return `Coincidencia: ${clientLocationData}`
                    }
                    return 'La Ubicacion de Venta No Coincide con la del Cliente.'
                } else {
                    return 'Ubicacion del Cliente No Encontrada.';
                }
            }
        }
    } catch (error) {
        console.log('ERROR EN LA FUNCION getClientLocation:', error)
    }
}

export default getClientLocation