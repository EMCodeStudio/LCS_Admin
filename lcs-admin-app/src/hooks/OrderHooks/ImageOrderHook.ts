import payload from "payload"
import { FieldHook } from "payload/types"
import { ImagenProducto, ImagenServicio } from "../../interfaces/OrderInterfaces/ImageOrderInterfaces"

const getProductServiceImage: FieldHook = async ({ data }) => {
    try {
        if (data && data.ProductoServicioPedido !== undefined) {
            const ImageProductServiceFieldId = data.ProductoServicioPedido.value
            let collection = ''
            if (data.TipoVentaPedido === 'product' && data.ProductoServicioPedido.relationTo === 'productos') {
                collection = 'productos'
            } else if (data.TipoVentaPedido === 'service' && data.ProductoServicioPedido.relationTo === 'servicios') {
                collection = 'servicios'
            }
            const responseImage = await payload.find({
                collection,
                where: {
                    id: ImageProductServiceFieldId,
                },
            })
            if (responseImage.docs && responseImage.docs.length > 0) {
                const resultImageId = collection === 'productos' ?
                    (responseImage.docs[0]?.ImagenesProducto as ImagenProducto[])?.[0]?.ImagenProducto.id :
                    (responseImage.docs[0]?.ImagenesServicio as ImagenServicio[])?.[0]?.ImagenServicio.id
                return resultImageId
            }
        }
    } catch (error) {
        console.log('ERROR EN LA FUNCION getProductServiceImage: ', error)
    }
}

export default getProductServiceImage;