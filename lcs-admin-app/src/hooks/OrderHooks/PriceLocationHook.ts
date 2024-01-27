import payload from "payload";
import { FieldHook } from "payload/types";


const getLocationPrice: FieldHook = async ({ data }) => {
    try {
        if (data) {
            const clientLocactionFieldId = data.UbicacionClientePedido
            const locationResponse = await payload.find({
                collection: 'ubicaciones',
                where: {
                    id: clientLocactionFieldId
                }
            })
            if (locationResponse.docs && locationResponse.docs.length > 0) {
                const priceLocationData = locationResponse.docs[0].PrecioEnvioUbicacion

                if (!priceLocationData) {
                    console.log('No se pudo optener el Costo de Envio!')
                }
                return priceLocationData
            }
        }
    } catch (error) {
        console.log('Error en la Funcion getLocationPrice :', error)
    }
}

export default getLocationPrice