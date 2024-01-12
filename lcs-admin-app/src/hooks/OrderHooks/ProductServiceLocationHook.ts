import payload from "payload"
import { FieldHook } from "payload/types"
import { LocationData, Ubicacion } from "../../interfaces/OrderInterfaces/OrderLocationInterface"

const getProductServiceLocation: FieldHook = async ({ data }) => {
    try {
        if (data) {
            const productServiceFieldId = data.ProductoServicioPedido.value
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
            if (respondeLocation.docs && respondeLocation.docs.length > 0) {
                
                const formatLocationData = (ubicacion: Ubicacion): string => {
                    const { PaisUbicacion, DepartamentoUbicacion, MunicipioUbicacion } = ubicacion
                    return `${PaisUbicacion} - ${DepartamentoUbicacion.NombreDepartamento} - ${MunicipioUbicacion.NombreMunicipio}`
                }

                let locationData: LocationData[] = []

                const dataServerLocation = collection === 'productos' ?
                    respondeLocation.docs[0]?.UbicacionProducto as Ubicacion[] :
                    respondeLocation.docs[0]?.UbicacionServicio as Ubicacion[]

                dataServerLocation.forEach((ubicacion: Ubicacion) => {
                    const getLocationString = formatLocationData(ubicacion)
                    locationData.push(getLocationString + '\n')
                })

                const resultLocation = locationData.join('')
                return resultLocation;
            }
        }
    } catch (error) {
        return 'ERROR EN LA FUNCION getProductServiceLocation.'
    }
}

export default getProductServiceLocation;