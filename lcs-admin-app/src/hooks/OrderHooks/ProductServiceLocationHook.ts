import payload from "payload"
import { FieldHook } from "payload/types"
import { LocationType, UbicacionInterface, UbicacionInterfaceProdServ } from "../../interfaces/OrderInterfaces/OrderLocationInterface"

const getProductServiceLocation: FieldHook = async ({ data, originalDoc }) => {
    try {
        if (data) {
            const productServiceFieldId = data.ProductoServicioPedido.value
            const stateApprovalField = data.AprobacionEstadoPedido
            let collection = ''
            if (data.TipoVentaPedido === 'product' && data.ProductoServicioPedido.relationTo === 'productos') {
                collection = 'productos'
            } else if (data.TipoVentaPedido === 'service' && data.ProductoServicioPedido.relationTo === 'servicios') {
                collection = 'servicios'
            }
            const respondeLocation = await payload.find({
                collection,
                where: {
                    id: productServiceFieldId
                }
            })

            if (stateApprovalField === 'approved') {
                const  clientLocation  = originalDoc.UbicacionProductoServicioPedido
                return clientLocation
            } else {
            if (respondeLocation.docs && respondeLocation.docs.length > 0) {
                
                const formatLocationData = (ubicacion: UbicacionInterfaceProdServ): string => {
                    const { PaisUbicacion, DepartamentoUbicacion, MunicipioUbicacion } = ubicacion
                    return `${PaisUbicacion} - ${DepartamentoUbicacion.NombreDepartamento} - ${MunicipioUbicacion.NombreMunicipio}`
                }
                let locationData: LocationType[] = []
                const dataServerLocation = collection === 'productos' ?
                    respondeLocation.docs[0]?.UbicacionProducto as UbicacionInterfaceProdServ[] :
                    respondeLocation.docs[0]?.UbicacionServicio as UbicacionInterfaceProdServ[]
                dataServerLocation.forEach((ubicacion: UbicacionInterfaceProdServ) => {
                    const getLocationString = formatLocationData(ubicacion)
                    locationData.push(getLocationString + '\n')
                })
                const resultLocation = locationData.join('')
                return resultLocation;
            }
        }
    }
    } catch (error) {
        return 'ERROR EN LA FUNCION getProductServiceLocation.'
    }
}

export default getProductServiceLocation;