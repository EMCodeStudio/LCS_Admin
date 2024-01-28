import { FieldHook } from "payload/types"
import { LocationType, UbicacionInterface } from "../../interfaces/OrderInterfaces/OrderLocationInterface"
import payload from "payload"

const getClientLocation: FieldHook = async ({ data, }) => {
    try {
        if (data) {

            const clientFieldId = data.ClienteIdPedido

            const locationProdServField = data.UbicacionProductoServicioPedido
            console.log('FIELD ID PROD SERV UBICACION:', locationProdServField)

            const responseClientLocation = await payload.find({
                collection: 'clientes',
                where: {
                    id: clientFieldId
                }
            })

            //console.log('DATA CLIENTE:', responseClientLocation)

            if (responseClientLocation.docs && responseClientLocation.docs.length > 0) {

                let locationDataString: LocationType = ''
                const clientLocationData = responseClientLocation.docs[0].UbicacionCliente

               // console.log('DATA CLIENTE UBICACION:', clientLocationData)
              
                const formatLocationData = (ubicacionCliente: UbicacionInterface): string => {
                    const { PaisUbicacion, DepartamentoUbicacion, MunicipioUbicacion } = ubicacionCliente
                    return `${PaisUbicacion} - ${DepartamentoUbicacion.NombreDepartamento} - ${MunicipioUbicacion.NombreMunicipio}`
                }

                if (clientLocationData) {
                    const getLocationFormatString = formatLocationData(clientLocationData as UbicacionInterface)
                    locationDataString = getLocationFormatString
                    console.log('UBICACION DE CLIENTE:', locationDataString)
                }

                if (locationDataString) {

                    const valueCaseClientLocation = locationDataString
                    const foundedClientLocation = locationProdServField.includes(valueCaseClientLocation)
                    console.log('CLIENTE ENCONTRADO? :', foundedClientLocation)

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